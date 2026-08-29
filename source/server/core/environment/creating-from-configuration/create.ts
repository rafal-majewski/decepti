import type {configuration_} from "../configuration/module.ts";
import type {implementations_} from "../implementations/module.ts";
import type {supported_} from "../supported/module.ts";
export function create(
	configuration: configuration_.supported_.SupportedConfiguration,
): supported_.SupportedEnvironment {
	switch (configuration.type) {
		case `withNodeAdapter`: {
			const environment: implementations_.withNodeAdapter_.WithNodeAdapterEnvironment =
				{
					configurationOfAdapter: configuration.adapter,
					type: `withNodeAdapter`,
					webPush: configuration.webPush,
				};
			return environment;
		}
		case `withStaticAdapter`: {
			const environment: implementations_.withStaticAdapter_.WithStaticAdapterEnvironment =
				{
					configurationOfAdapter: configuration.adapter,
					type: `withStaticAdapter`,
					webPush: configuration.webPush,
				};
			return environment;
		}
	}
}
