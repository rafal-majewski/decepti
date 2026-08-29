import type {source_} from "../../../source/module.ts";
import {
	type StartedTestContainer,
	type TestContainer,
	Wait,
} from "testcontainers";
import type {z} from "zod";
export async function run(
	dockerImageOfApplication: TestContainer,
	numberOfPortOfBindOfServer: number,
): Promise<StartedTestContainer> {
	const container: StartedTestContainer = await dockerImageOfApplication
		.withAutoRemove(true)
		.withEnvironment({
			SERVER__BIND__ADDRESS: `::`,
			SERVER__BIND__PORT__NUMBER: numberOfPortOfBindOfServer.toString(10),
			SERVER__BIND__PORT__TLS__IS_ENABLED: `no`,
			WEB_PUSH__EMAIL: `mailto:test@example.com`,
			WEB_PUSH__PRIVATE_KEY: `private-key`,
			WEB_PUSH__PUBLIC_KEY: `public-key`,
		} satisfies z.input<
			typeof source_.server_.core_.environment_.configuration_.implementations_.withNodeAdapter_.schemaForProcessEnv_.schema
		>)
		.withExposedPorts(numberOfPortOfBindOfServer)
		.withStartupTimeout(600000)
		.withWaitStrategy(Wait.forListeningPorts())
		.start();
	return container;
}
