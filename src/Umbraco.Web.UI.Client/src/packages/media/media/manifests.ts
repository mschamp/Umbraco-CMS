import { manifests as collectionViewManifests } from './collection-view/manifests.js';
import { manifests as entityActionsManifests } from './entity-actions/manifests.js';
import { manifests as entityBulkActionsManifests } from './entity-bulk-actions/manifests.js';
import { manifests as menuItemManifests } from './menu-item/manifests.js';
import { manifests as propertyEditorsManifests } from './property-editors/manifests.js';
import { manifests as repositoryManifests } from './repository/manifests.js';
import { manifests as treeManifests } from './tree/manifests.js';
import { manifests as workspaceManifests } from './workspace/manifests.js';

export const manifests = [
	...collectionViewManifests,
	...entityActionsManifests,
	...entityBulkActionsManifests,
	...menuItemManifests,
	...propertyEditorsManifests,
	...repositoryManifests,
	...treeManifests,
	...workspaceManifests,
];
