import * as process from "node:process";
import * as dotenv from "dotenv";
import { PromptTemplate } from "langchain/prompts";
import { ConversationChain, LLMChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";

dotenv.config();

const model = new OpenAI({
	temperature: 0,
});
// To enable streaming, we pass in `streaming: true` to the LLM constructor.
// Additionally, we pass in a handler for the `handleLLMNewToken` event.
const chat = new OpenAI({
	streaming: true,
	callbacks: [
		{
			// eslint-disable-next-line @typescript-eslint/naming-convention
			handleLLMNewToken(token: string) {
				process.stdout.write(token);
			},
		},
	],
});

const memory = new BufferMemory();

// // 1
// // const prompt = "What would be a good company name a company that makes colorful socks?";
// // const results = await model.call(prompt);

// // 2
// const promptTemplate = new PromptTemplate({
// 	template: "What is a good name for a company that makes {product}?",
// 	inputVariables: ["product"],
// });
// const prompt = await promptTemplate.format({ product: "colorful socks" });
// const results = await model.call(prompt);

// // 3
// const chain = new LLMChain({ llm: model, prompt: promptTemplate });
// const results = await chain.call({ product: "colorful noses" });

// 4
// const tools = [
// 	new SerpAPI(process.env["SERPAPI_API_KEY"], {
// 		location: "Austin,Texas,United States",
// 		hl: "en",
// 		gl: "us",
// 	}),
// 	new Calculator(),
// ];
// const executor = await initializeAgentExecutorWithOptions(tools, model, {
// 	agentType: "zero-shot-react-description",
// });
// console.log("Loaded agent.");
// const input = "Who is Olivia Wilde's boyfriend? What is his current age raised to the 0.23 power?";
// console.log(`Executing with input "${input}"...`);
// const results = await executor.call({ input });

// // 5
// const chain = new ConversationChain({ llm: model, memory });
// const r1 = await chain.call({ input: "Hi! I'm Jim." });
// console.log(r1);
// const r2 = await chain.call({ input: "What's my name?" });
// console.log(r2);

// 6
await chat.call("Write me a song about sparkling water.");

// console.log("Results:", results);
