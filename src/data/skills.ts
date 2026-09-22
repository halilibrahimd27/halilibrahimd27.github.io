import type { SkillGroupFacts } from './types';

/**
 * Yetenekler — teknoloji adları dilden bağımsız olduğu için burada,
 * kategori BAŞLIKLARI content.tr.ts / content.en.ts içinde aynı id ile.
 */
export const skillGroups = [
  {
    id: 'languages',
    items: ['Python', 'Go', 'TypeScript', 'Bash', 'Java'],
  },
  {
    id: 'platform',
    items: [
      'Docker',
      'Kubernetes',
      'Proxmox VE',
      'Terraform',
      'Ansible',
      'Nginx',
      'HAProxy',
      'Linux',
      'AWS',
    ],
  },
  {
    id: 'security',
    items: [
      'Trivy',
      'Semgrep',
      'Falco',
      'Cosign',
      'SBOM / CycloneDX',
      'HashiCorp Vault',
      'kube-bench',
      'OWASP Top 10',
      'Threat modeling',
      'Secure SDLC',
      'SAST / DAST / SCA',
    ],
  },
  {
    id: 'observability',
    items: ['Prometheus', 'Grafana', 'OpenTelemetry', 'ELK', 'Sentry'],
  },
  {
    id: 'cicd',
    items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Argo CD', 'GitOps'],
  },
  {
    id: 'data',
    items: ['PostgreSQL', 'MariaDB', 'MongoDB', 'Redis'],
  },
] as const satisfies readonly SkillGroupFacts[];

export type SkillGroupId = (typeof skillGroups)[number]['id'];
