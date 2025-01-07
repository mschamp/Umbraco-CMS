import { UMB_DOCUMENT_PUBLISHING_WORKSPACE_CONTEXT } from '../../workspace-context/constants.js';
import { UmbWorkspaceActionBase } from '@umbraco-cms/backoffice/workspace';

export class UmbDocumentPublishWithDescendantsWorkspaceAction extends UmbWorkspaceActionBase {
	override async execute() {
		const workspaceContext = await this.getContext(UMB_DOCUMENT_PUBLISHING_WORKSPACE_CONTEXT);
		return workspaceContext.publishWithDescendants();
	}
}

export { UmbDocumentPublishWithDescendantsWorkspaceAction as api };