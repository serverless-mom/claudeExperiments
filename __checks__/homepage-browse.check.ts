//homepage-browse.check.ts
import { AlertChannel, AlertEscalationBuilder, BrowserCheck, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('browse-danube-homepage-v1', {
  name: 'Browse Danube Homepage',
  code: {
    entrypoint: './homepage-browse.spec.ts',
  },
  activated: true,
  muted: true,
  shouldFail: false,
  locations: [
    'us-east-1',
    'us-west-1',
  ],
  frequency: 30,
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation(1, {
    amount: 0,
    interval: 5,
  }, {
    enabled: false,
    percentage: 10,
  }),
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
  runParallel: true,
})