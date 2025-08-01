# Claude Experiments - Checkly Monitoring Project

## Project Overview

This is a Checkly monitoring-as-code project that demonstrates how to implement comprehensive monitoring for web applications using the Checkly CLI. The project monitors the Danube WebShop (https://danube-web.shop) using various types of checks including API monitoring, URL monitoring, and browser automation tests.

## Memories and Best Practices

- When writing Playwright, don't set locators equal to const, rather just perform expect tests directly on locators
- When writing a spec.ts file, don't use locators based on CSS class

## Architecture

### Project Structure
```
.
├── README.md                    # Project documentation
├── checkly.config.ts           # Main configuration file
├── package.json                # NPM dependencies and scripts
├── rules.md                    # Checkly CLI usage guidelines
├── .gitignore                  # Git ignore patterns
└── __checks__/                 # Directory containing all monitoring checks
    ├── api.check.ts            # API endpoint monitoring
    ├── browse-items.spec.ts    # Browser automation for product browsing
    ├── heartbeat.check.ts      # Heartbeat monitor (commented out - requires paid plan)
    ├── homepage-browse-check.ts # Browser check configuration for homepage browsing
    ├── homepage-browse.spec.ts # Enhanced browser test for homepage and shopping flow
    ├── homepage.spec.ts        # Browser automation for homepage testing
    └── url.check.ts            # Simple URL availability monitoring
```

[Rest of the file remains unchanged]