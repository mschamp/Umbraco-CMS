import { UUITextStyles } from '@umbraco-ui/uui';
import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Subscription, map } from 'rxjs';
import { UmbContextConsumerMixin } from '../../core/context';
import { UmbExtensionManifestPropertyAction, UmbExtensionRegistry } from '../../core/extension';

import './node-property-action.element';

@customElement('umb-node-property-actions')
export class UmbNodePropertyActions extends UmbContextConsumerMixin(LitElement) {
  static styles: CSSResultGroup = [
    UUITextStyles,
    css`
      #dropdown {
        background-color: white;
        border-radius: var(--uui-border-radius);
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-3);
        min-width: 200px;
        color: black; /* Change to variable */
      }
    `,
  ];


  @property()
  public propertyEditorUIAlias = '';

  @state()
  private _actions: Array<UmbExtensionManifestPropertyAction> = [];

  @state()
  private _open = false;
  
  private _extensionRegistry?: UmbExtensionRegistry;
  private _subscription?: Subscription;
  
  constructor () {
    super();

    this.consumeContext('umbExtensionRegistry', (extensionRegistry: UmbExtensionRegistry) => {
      this._extensionRegistry = extensionRegistry;
      this._usePropertyActions();
    });
  }

  private _usePropertyActions () {
    this._subscription?.unsubscribe();

    this._extensionRegistry?.extensionsOfType('propertyAction')
    .pipe(
      map(propertyActions => propertyActions.filter(propertyAction => propertyAction.meta.propertyEditors.includes(this.propertyEditorUIAlias))))
    .subscribe(extensions => {
      this._actions = extensions;
    });
  }

  private _toggleMenu () {
    this._open = !this._open;
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    this._subscription?.unsubscribe();
  }
  
  render () {
    return html`
      ${ this._actions?.length > 0 ? html`
        <uui-popover
          .open=${this._open}
          placement="bottom-start"
          @close="${() => this._open = false}">
          <uui-button
            slot="trigger"
            look="secondary"
            label="More"
            @click="${this._toggleMenu}"
            compact>
            <uui-symbol-more></uui-symbol-more>
          </uui-button>

          <div slot="popover" id="dropdown">
            ${this._actions.map(
              action => html`
                <umb-node-property-action .propertyAction=${action}></umb-node-property-action>
              `
            )}
          </div>
        </uui-popover>
      ` : '' }
    `;
  }
}