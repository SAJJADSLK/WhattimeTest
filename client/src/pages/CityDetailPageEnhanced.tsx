import { useMemo, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { useRealTimeClock, formatClockTime } from '@/hooks/useRealTimeClock';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, MapPin, Clock, Sunrise, Compass, AlertCircle, Phone } from 'lucide-react';
import { DateTime } from 'luxon';
import { useParams, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';

export default function CityDetailPageEnhanced() {
  const params = useParams();
  const [, navigate] = useLocation();
  const { t } = useTranslation();
  
  // Support both old (/city-detail/:city) and new (/:country/:city) routes
  const cityParam = params.city?.replace(/-/g, ' ') || params.city || '';
  const countryParam = params.country || '';

  // FIX: Convert URL slug to proper country name for DB matching
  const formattedCountry = useMemo(() => {
    if (!countryParam) return '';
    return countryParam
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }, [countryParam]);

  // Fetch city data
  const { data: cities } = trpc.cities.getAll.useQuery({ limit: 500 });

  const city = useMemo(() => {
    if (!cities) return undefined;
    if (formattedCountry) {
      const match = cities.find(
        (c) =>
          c.name.toLowerCase() === cityParam.toLowerCase() &&
          c.country.toLowerCase() === formattedCountry.toLowerCase()
      );
      return match ?? cities.find((c) => c.name.toLowerCase() === cityParam.toLowerCase());
    }
    return cities.find((c) => c.name.toLowerCase() === cityParam.toLowerCase());
  }, [cities, cityParam, formattedCountry]);

  const { time } = useRealTimeClock(city?.timezone || 'UTC');

  // Fetch enhanced city data from server (DST, phone codes, sun times)
  const { data: enhancedData } = trpc.cities.getEnhanced?.useQuery(
    { cityId: city?.id || 0 },
    { enabled: !!city?.id }
  );

  const allCities = cities;

  // Calculate time differences
  const timeDifferences = useMemo(() => {
    if (!city || !allCities) return [];
    
    const cityTime = DateTime.now().setZone(city.timezone);
    
    return allCities
      .filter(c => c.id !== city.id)
      .map(c => {
        const otherTime = DateTime.now().setZone(c.timezone);
        const diffMinutes = otherTime.diff(cityTime, 'minutes').minutes;
        const diffHours = Math.floor(diffMinutes / 60);
        const diffMins = Math.round(diffMinutes % 60);
        
        return {
          name: c.name,
          country: c.country,
          diffHours,
          diffMins,
          timezone: c.timezone,
        };
      })
      .sort((a, b) => a.diffHours - b.diffHours)
      .slice(0, 20);
  }, [city, allCities]);

  // Update page title and meta tags dynamically
  useEffect(() => {
    if (city) {
      document.title = `${t('city.exactTime', { city: city.name })} - WhatTime`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          'content',
          `${t('city.exactTime', { city: city.name })}. Check timezone (${city.timezone}), DST status, sunrise/sunset times, and phone code for ${city.name}, ${city.country}.`
        );
      }
    }
  }, [city, t]);

  if (!city) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t('city.cityNotFound')}</p>
          <Button onClick={() => navigate('/')}>{t('common.back')}</Button>
        </div>
      </div>
    );
  }

  // Build canonical URL
  const cityCountrySlug = city.country.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s\W]+/g, '-');
  const citySlug = city.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s\W]+/g, '-');
  const canonicalUrl = `https://whattime.info/${cityCountrySlug}/${citySlug}`;

  return (
    <>
      {/* SEO Meta Tags */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: `${t('city.exactTime', { city: city.name })}`,
          url: canonicalUrl,
          areaServed: city.country,
          description: `Current local time in ${city.name}, ${city.country}`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: city.name,
            addressCountry: city.country,
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: city.latitude,
            longitude: city.longitude,
          },
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Navigation */}
        <nav className="border-b border-slate-200 sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.back')}
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">
              {city.name}, {city.country}
            </h1>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="mb-12 space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-slate-900">
                {t('city.exactTime', { city: city.name })}
              </h1>
              <p className="text-xl text-slate-600">{city.country}</p>
              <p className="text-sm text-slate-500">{t('timezone.timezone')}: {city.timezone}</p>
            </div>

            {/* Large Clock Display */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white text-center space-y-6 shadow-lg">
              <div className="text-8xl font-mono font-bold tracking-wider">
                {time ? formatClockTime(time) : '00:00:00'}
              </div>
              <div className="text-2xl font-semibold">{time?.date || 'Loading...'}</div>
              <div className="text-sm opacity-90">
                {city.timezone} • {city.country}
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Location Info */}
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                {t('city.location')}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">{t('city.city')}</span>
                  <span className="font-semibold text-slate-900">{city.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t('city.country')}</span>
                  <span className="font-semibold text-slate-900">{city.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t('city.region')}</span>
                  <span className="font-semibold text-slate-900">{city.region || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t('city.population')}</span>
                  <span className="font-semibold text-slate-900">
                    {city.population ? parseInt(city.population.toString()).toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t('common.language')}</span>
                  <span className="font-semibold text-slate-900">Coordinates</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Lat: {city.latitude.toFixed(4)}°</span>
                  <span className="text-slate-500">Lon: {city.longitude.toFixed(4)}°</span>
                </div>
              </div>
            </Card>

            {/* Timezone & DST Info */}
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                {t('timezone.timezone')}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">{t('timezone.timezone')}</span>
                  <span className="font-mono font-semibold text-slate-900">{city.timezone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t('timezone.utcOffset')}</span>
                  <span className="font-mono font-semibold text-slate-900">
                    UTC{city.utcOffsetMinutes >= 0 ? '+' : ''}{Math.floor(city.utcOffsetMinutes / 60)}:{String(city.utcOffsetMinutes % 60).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t('timezone.dstStatus')}</span>
                  <span className={`font-semibold ${time?.isDst ? 'text-green-600' : 'text-slate-900'}`}>
                    {time?.isDst ? t('timezone.active') : t('timezone.inactive')}
                  </span>
                </div>
                {enhancedData?.nextDstChange && (
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Next DST Change
                    </span>
                    <span className="font-semibold text-blue-600">
                      {enhancedData.nextDstChange.type === 'spring-forward' ? '🕐 +1h' : '🕑 -1h'} on {enhancedData.nextDstChange.date}
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* Sun Data */}
            {enhancedData?.sunTimes && (
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Sunrise className="w-5 h-5 text-orange-600" />
                  {t('city.sunTimes')}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t('timezone.sunrise')}</span>
                    <span className="font-semibold text-slate-900">{enhancedData.sunTimes.sunrise}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">{t('timezone.sunset')}</span>
                    <span className="font-semibold text-slate-900">{enhancedData.sunTimes.sunset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Dawn</span>
                    <span className="font-semibold text-slate-900">{enhancedData.sunTimes.dawn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Dusk</span>
                    <span className="font-semibold text-slate-900">{enhancedData.sunTimes.dusk}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-600">Day Length</span>
                    <span className="font-semibold text-slate-900">{enhancedData.sunTimes.daylightHours} hours</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Phone Code & Country Info */}
            {enhancedData?.phoneCode && (
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  Country Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Phone Code</span>
                    <span className="font-mono font-semibold text-slate-900">{enhancedData.phoneCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">DST Observed</span>
                    <span className="font-semibold text-slate-900">
                      {enhancedData.dstObserved ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                  {enhancedData.dstStart && (
                    <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                      <span>DST: {enhancedData.dstStart} → {enhancedData.dstEnd}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Time Differences */}
          {timeDifferences.length > 0 && (
            <Card className="p-6 mb-12">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                {t('city.timeDifferences', { city: city.name })}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeDifferences.map((diff) => (
                  <div
                    key={`${diff.name}-${diff.timezone}`}
                    className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-slate-900">{diff.name}</p>
                        <p className="text-xs text-slate-600">{diff.country}</p>
                      </div>
                      <span className="text-sm font-mono font-bold text-blue-600">
                        {diff.diffHours > 0 ? '+' : ''}{diff.diffHours}h {diff.diffMins}m
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
