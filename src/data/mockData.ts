export type RiskLevel = 'CRITICAL' | 'MEDIUM' | 'SECURE';

export interface PullRequest {
  id: string;
  number: number;
  service: string;
  title: string;
  riskLevel: RiskLevel;
  error?: string;
  insight?: string;
  author: {
    name: string;
    avatar: string;
  };
  diff: {
    filename: string;
    oldCode: string;
    newCode: string;
  }[];
}

export const mockPRs: PullRequest[] = [
  {
    id: '1',
    number: 4092,
    service: 'auth-service',
    title: 'Upgrade OAuth2.0 logic to support multi-tenant flows',
    riskLevel: 'CRITICAL',
    error: 'Potential SQL Injection in user scope resolution.',
    insight: 'AI detected unparameterized input at line 142 of auth_provider.go.',
    author: {
      name: 'James D. Sentinel',
      avatar: 'JD',
    },
    diff: [
      {
        filename: 'auth_provider.go',
        oldCode: `func resolveScope(tenantID string, scope string) string {
  query := "SELECT permissions FROM scopes WHERE tenant_id = '" + tenantID + "' AND name = '" + scope + "'"
  // ... execution logic
}`,
        newCode: `func resolveScope(tenantID string, scope string) string {
  query := "SELECT permissions FROM scopes WHERE tenant_id = ? AND name = ?"
  // ... execution logic with parameterized query
}`,
      }
    ]
  },
  {
    id: '2',
    number: 4088,
    service: 'billing-core',
    title: 'Update Stripe API version and fix webhook handling',
    riskLevel: 'MEDIUM',
    error: 'Excessive logging of PII in debug mode discovered.',
    insight: 'Log rotation might leak sensitive metadata if verbose logging is kept enabled.',
    author: {
      name: 'Sarah Chen',
      avatar: 'SC',
    },
    diff: [
      {
        filename: 'webhooks.ts',
        oldCode: `app.post('/webhooks', (req, res) => {
  console.log('Received webhook:', JSON.stringify(req.body, null, 2));
  // ... process webhook
});`,
        newCode: `app.post('/webhooks', (req, res) => {
  const { id, type } = req.body;
  console.log(\`Received webhook: \${type} (\${id})\`);
  // ... process webhook securely
});`,
      }
    ]
  },
  {
    id: '3',
    number: 4085,
    service: 'ui-shell',
    title: 'Refactor Tailwind config for better build performance',
    riskLevel: 'SECURE',
    insight: 'Static analysis confirms safe dependency updates and bundle optimization.',
    author: {
      name: 'Alex Rivera',
      avatar: 'AR',
    },
    diff: [
      {
        filename: 'tailwind.config.js',
        oldCode: `module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
        newCode: `export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Optimized theme extensions
    },
  },
  plugins: [],
}`,
      }
    ]
  },
  {
    id: '4',
    number: 4080,
    service: 'data-bridge',
    title: 'Fix race condition in Redis consumer group lag',
    riskLevel: 'MEDIUM',
    error: 'Potential resource exhaustion via unclosed connections.',
    insight: 'Locking mechanism lacks a timeout in distributed contexts.',
    author: {
      name: 'Mike Ross',
      avatar: 'MR',
    },
    diff: [
      {
        filename: 'redis_client.py',
        oldCode: `def get_lock(key):
    while not redis.setnx(key, "locked"):
        pass
    return True`,
        newCode: `def get_lock(key, timeout=10):
    start_time = time.time()
    while not redis.set(key, "locked", nx=True, ex=timeout):
        if time.time() - start_time > timeout:
            return False
        time.sleep(0.1)
    return True`,
      }
    ]
  }
];
