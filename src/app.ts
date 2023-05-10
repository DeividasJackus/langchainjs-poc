import * as process from "node:process";
import * as util from "node:util";
import * as dotenv from "dotenv";
import {
	PromptTemplate,
	SystemMessagePromptTemplate,
	HumanMessagePromptTemplate,
	ChatPromptTemplate,
	MessagesPlaceholder,
} from "langchain/prompts";
import { ConversationChain, LLMChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { OpenAI } from "langchain/llms/openai";
import { AgentExecutor, ChatAgent, initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

dotenv.config();

// 1
// const model = new OpenAI({ temperature: 0 });
// const prompt = "What would be a good company name a company that makes colorful socks?";
// const results = await model.call(prompt);
// console.log("Results:", results);

// 2
// const model = new OpenAI({ temperature: 0 });
// const promptTemplate = new PromptTemplate({
// 	template: "What is a good name for a company that makes {product}?",
// 	inputVariables: ["product"],
// });
// const prompt = await promptTemplate.format({ product: "colorful socks" });
// const results = await model.call(prompt);
// console.log("Results:", results);

// 3
// const model = new OpenAI({ temperature: 0 });
// const chain = new LLMChain({ llm: model, prompt: promptTemplate });
// const results = await chain.call({ product: "colorful noses" });
// console.log("Results:", results);

// 4
// const model = new OpenAI({ temperature: 0 });
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
// console.log("Results:", results);

// 5
// const model = new OpenAI({ temperature: 0 });
// const memory = new BufferMemory();
// const chain = new ConversationChain({ llm: model, memory });
// const r1 = await chain.call({ input: "Hi! I'm Jim." });
// console.log(r1);
// const r2 = await chain.call({ input: "What's my name?" });
// console.log(r2);

// 6
// To enable streaming, we pass in `streaming: true` to the LLM constructor.
// Additionally, we pass in a handler for the `handleLLMNewToken` event.
// const chat = new OpenAI({
// 	streaming: true,
// 	callbacks: [
// 		{
// 			// eslint-disable-next-line @typescript-eslint/naming-convention
// 			handleLLMNewToken(token: string) {
// 				process.stdout.write(token);
// 			},
// 		},
// 	],
// });
// await chat.call("Write me a song about sparkling water.");

// 7
// const chat = new ChatOpenAI({ temperature: 0 });
// const response = await chat.call([
// 	new HumanChatMessage("Translate this sentence from English to French. I love programming."),
// ]);
// console.log(response);

// 8
// const chat = new ChatOpenAI({ temperature: 0 });
// const response = await chat.call([
// 	new SystemChatMessage("You are a helpful assistant that translates English to French."),
// 	new HumanChatMessage("Translate: I love programming."),
// ]);
// console.log(response);

// 9
// const chat = new ChatOpenAI({ temperature: 0 });
// const response = await chat.generate([
// 	[
// 		new SystemChatMessage("You are a helpful assistant that translates English to French."),
// 		new HumanChatMessage("Translate this sentence from English to French. I love programming."),
// 	],
// 	[
// 		new SystemChatMessage("You are a helpful assistant that translates English to French."),
// 		new HumanChatMessage("Translate this sentence from English to French. I love artificial intelligence."),
// 	],
// ]);
// console.log(util.inspect(response, { depth: null }));

// 10
// const chat = new ChatOpenAI({ temperature: 0 });
// const translationPrompt = ChatPromptTemplate.fromPromptMessages([
// 	SystemMessagePromptTemplate.fromTemplate(
// 		"You are a helpful assistant that translates {inputLanguage} to {outputLanguage}.",
// 	),
// 	HumanMessagePromptTemplate.fromTemplate("{text}"),
// ]);
// const response = await chat.generatePrompt([
// 	await translationPrompt.formatPromptValue({
// 		inputLanguage: "English",
// 		outputLanguage: "Danish",
// 		text: "I love programming.",
// 	}),
// ]);
// console.log(util.inspect(response, { depth: null }));

// 11
// const chat = new ChatOpenAI({ temperature: 0 });
// const translationPrompt = ChatPromptTemplate.fromPromptMessages([
// 	SystemMessagePromptTemplate.fromTemplate(
// 		"You are a helpful assistant that translates {inputLanguage} to {outputLanguage}.",
// 	),
// 	HumanMessagePromptTemplate.fromTemplate("{text}"),
// ]);
// const chain = new LLMChain({
// 	prompt: translationPrompt,
// 	llm: chat,
// });
// const response = await chain.call({
// 	inputLanguage: "English",
// 	outputLanguage: "Danish",
// 	text: "I love programming.",
// });
// console.log(util.inspect(response, { depth: null }));

// 12
// const chat = new ChatOpenAI({ temperature: 0 });
// const tools = [new SerpAPI(process.env.SERPAPI_API_KEY)];
// const agent = ChatAgent.fromLLMAndTools(chat, tools);
// const executor = AgentExecutor.fromAgentAndTools({ agent, tools });
// const response = await executor.run("What's the weather in Copenhagen?");
// console.log(util.inspect(response, { depth: null }));

// 13
// const chat = new ChatOpenAI({ temperature: 0 });
// const chatPrompt = ChatPromptTemplate.fromPromptMessages([
// 	SystemMessagePromptTemplate.fromTemplate(
// 		"The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.",
// 	),
// 	new MessagesPlaceholder("history"),
// 	HumanMessagePromptTemplate.fromTemplate("{input}"),
// ]);
// const chain = new ConversationChain({
// 	memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
// 	prompt: chatPrompt,
// 	llm: chat,
// });
// const response1 = await chain.call({
// 	input: "hi from London, how are you doing today",
// });
// console.log(response1);
// const response2 = await chain.call({
// 	input: "Do you know where I am?",
// });
// console.log(response2);

// 14
// const chat = new ChatOpenAI({
// 	streaming: true,
// 	callbacks: [
// 		{
// 			// eslint-disable-next-line @typescript-eslint/naming-convention
// 			handleLLMNewToken(token: string) {
// 				process.stdout.write(token);
// 			},
// 		},
// 	],
// });
// await chat.call([new HumanChatMessage("Write me a song about sparkling water.")]);
