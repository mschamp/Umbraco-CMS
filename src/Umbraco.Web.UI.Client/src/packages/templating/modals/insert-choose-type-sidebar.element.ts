import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { css, html, customElement } from '@umbraco-cms/backoffice/external/lit';
import type {
	UmbModalManagerContext,
	UmbModalContext,
	UmbDictionaryItemPickerModalValue,
} from '@umbraco-cms/backoffice/modal';
import {
	UMB_MODAL_MANAGER_CONTEXT,
	UMB_PARTIAL_VIEW_PICKER_MODAL,
	UMB_DICTIONARY_ITEM_PICKER_MODAL,
	UmbModalBaseElement,
} from '@umbraco-cms/backoffice/modal';

export interface ChooseInsertTypeModalData {
	hidePartialViews?: boolean;
}

export enum CodeSnippetType {
	partialView = 'partialView',
	dictionaryItem = 'dictionaryItem',
}
export interface UmbChooseInsertTypeModalValue {
	value: string | UmbDictionaryItemPickerModalValue;
	type: CodeSnippetType;
}

@customElement('umb-templating-choose-insert-type-modal')
export default class UmbChooseInsertTypeModalElement extends UmbModalBaseElement<
	ChooseInsertTypeModalData,
	UmbChooseInsertTypeModalValue
> {
	private _close() {
		this.modalContext?.reject();
	}

	private _modalContext?: UmbModalManagerContext;

	constructor() {
		super();
		this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (instance) => {
			this._modalContext = instance;
		});
	}

	#openModal?: UmbModalContext;

	#openInsertPartialViewSidebar() {
		this.#openModal = this._modalContext?.open(UMB_PARTIAL_VIEW_PICKER_MODAL);
		this.#openModal?.onSubmit().then((partialViewPickerModalValue) => {
			if (partialViewPickerModalValue) {
				this.value = {
					type: CodeSnippetType.partialView,
					value: partialViewPickerModalValue.selection[0],
				};
				this.modalContext?.submit();
			}
		});
	}

	#openInsertDictionaryItemModal() {
		this.#openModal = this._modalContext?.open(UMB_DICTIONARY_ITEM_PICKER_MODAL, {
			data: {
				pickableFilter: (item) => item.id !== null,
				hideTreeRoot: true,
			},
		});
		this.#openModal?.onSubmit().then((dictionaryItemPickerModalValue) => {
			if (dictionaryItemPickerModalValue) {
				this.value = { value: dictionaryItemPickerModalValue, type: CodeSnippetType.dictionaryItem };
				this.modalContext?.submit();
			}
		});
	}

	//TODO: insert this when we have partial views
	#renderInsertPartialViewButton() {
		return html`${this.data?.hidePartialViews
			? ''
			: html`<uui-button @click=${this.#openInsertPartialViewSidebar} look="placeholder" label="Insert value">
					<h3>${this.localize.term('template_insertPartialView')}</h3>
					<p>${this.localize.term('template_insertPartialViewDesc')}</p></uui-button
			  >`}`;
	}

	render() {
		return html`
			<umb-body-layout headline="Insert">
				<div id="main">
					<uui-box>
						<uui-button @click=${this.#openInsertDictionaryItemModal} look="placeholder" label="Insert Dictionary item">
							<h3>${this.localize.term('template_insertDictionaryItem')}</h3>
							<p>${this.localize.term('template_insertDictionaryItemDesc')}</p>
						</uui-button>
					</uui-box>
				</div>
				<div slot="actions">
					<uui-button @click=${this._close} look="secondary" label=${this.localize.term('general_close')}></uui-button>
				</div>
			</umb-body-layout>
		`;
	}

	static styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				color: var(--uui-color-text);
				--umb-header-layout-height: 70px;
			}

			#main {
				box-sizing: border-box;
				height: calc(
					100dvh - var(--umb-header-layout-height) - var(--umb-footer-layout-height) - 2 * var(--uui-size-layout-1)
				);
			}

			#main uui-button:not(:last-of-type) {
				display: block;
				margin-bottom: var(--uui-size-space-5);
			}

			h3,
			p {
				text-align: left;
			}
		`,
	];
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-templating-choose-insert-type-modal': UmbChooseInsertTypeModalElement;
	}
}
