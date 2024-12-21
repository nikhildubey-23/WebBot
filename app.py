from flask import Flask, request, jsonify
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM

app = Flask(__name__)

model = OllamaLLM(model="llama3.1:8b")

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question')
    answer_type = data.get('answer_type')

    if answer_type == "p":
        template = """Question: {question}

        Answer: In a form of paragraph."""
    else:
        template = """Question: {question}

        Answer: Let's think step by step."""

    prompt = ChatPromptTemplate.from_template(template)
    chain = prompt | model
    answer = chain.invoke({"question": question})

    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(debug=True)