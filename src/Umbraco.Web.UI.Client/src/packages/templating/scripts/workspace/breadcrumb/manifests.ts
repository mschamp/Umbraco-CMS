import type { ManifestWorkspaceFooterApp } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<ManifestWorkspaceFooterApp> = [
	{
		type: 'workspaceFooterApp',
		alias: 'Umb.WorkspaceFooterApp.Script.Breadcrumb',
		name: 'Script Breadcrumb Workspace Footer App',
		weight: 10,
		element: () => import('./workspace-breadcrumb.element.js'),
		conditions: [
			{
				alias: 'Umb.Condition.WorkspaceAlias',
				match: 'Umb.Workspace.Script',
			},
		],
	},
];
