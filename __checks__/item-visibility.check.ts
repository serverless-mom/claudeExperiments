import { AlertEscalationBuilder, BrowserCheck, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('item-visibility-check-v1', {
  name: 'Item Visibility Check',
  code: {
    entrypoint: './item-visibility.spec.ts',
  },
  activated: true,
  muted: false,
  shouldFail: false,
  locations: [
    'us-east-1',
    'eu-west-1',
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
    baseBackoffSeconds: 30,
    maxRetries: 2,
    maxDurationSeconds: 300,
    sameRegion: true,
  }),
  runParallel: true,
})