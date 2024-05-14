import type { UmbStaticFileEntityType, UmbStaticFileFolderEntityType, UmbStaticFileRootEntityType } from '../entity.js';
import type { UmbTreeItemModel, UmbTreeRootModel } from '@umbraco-cms/backoffice/tree';

export interface UmbStaticFileTreeItemModel extends UmbTreeItemModel {
	entityType: UmbStaticFileEntityType | UmbStaticFileFolderEntityType;
}

export interface UmbStaticFileTreeRootModel extends UmbTreeRootModel {
	entityType: UmbStaticFileRootEntityType;
}
