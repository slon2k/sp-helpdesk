import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "HelpDeskClientWebPartStrings";
import App from "./components/app";
import { sp } from "@pnp/sp";
import { IAppProps } from "./components/app/IAppProps";
import ApiService from "@src/services/api";

export interface IHelpDeskClientWebPartProps {
  listTitle: string;
}

export default class HelpDeskClientWebPart extends BaseClientSideWebPart<
  IHelpDeskClientWebPartProps
> {
  public async onInit(): Promise<void> {
    await super.onInit();
    sp.setup({
      spfxContext: this.context
    });
    ApiService.Init(this.properties.listTitle);
  }

  public render(): void {
    const element: React.ReactElement<IAppProps> = React.createElement(App, {
      listTitle: this.properties.listTitle
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("listTitle", {
                  label: "List title"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
