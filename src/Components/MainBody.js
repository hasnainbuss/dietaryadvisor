import { useState } from "react";
import { Button, Input, Spin } from "antd";
import config from "../../config";

const OPENAI_API_KEY = config.openai.apiKey; // secure -> environment variable
const { TextArea } = Input;

function MainBody() {
  console.log("environemnt ", process.env.REACT_APP_OPENAI_API_KEY);
  const [questions, setQuestions] = useState("");
  const [advice, setAdvice] = useState(""); // "Negative" or "Positive"
  const [loading, setLoading] = useState(false);
  async function callOpenAIAPI() {
    setLoading(true);

    // What is the advice of this questions with a value between 0 and 10 (10 being its very positive)?

    const APIBody = {
      model: "text-davinci-003",
      prompt:
        "You are a professional dietitian. You are an expert on the teachings and practices of all kinds of diets whether it is meat, fruit, juicing, or vegetables or if it is about fasting. You know all the books that have ever been written on the topic of diet. You use the wisdom of all these books to help the clients of your dietician business who seek help from you in their dietary struggles.   \n\nYou will provide your answer by carefully analyzing the problem and generate the best possible solution for your clients by providing them examples. You will greet them properly and you will not answer questions about philosophers, painters, and actors.\n\n\n\nQ: How Can I Drink More Water?\nA: Try drinking a glass upon waking and one with every meal. Proper hydration is vital for health. It helps regulate body temperature, removes waste, lubricates joints, helps prevent infections, shuttles nutrients to cells, and helps organs function properly. \n\nQ: Why Should I Eat a High-Fiber Diet?\nA: Dietary fiber from fruits, vegetables, whole grains, and legumes can help maintain a healthy weight, lower blood cholesterol and glucose levels, help food pass through the digestive system, promote regularity and prevent constipation. Aim for at least 25 grams per day.\n\nQ: How Can I Eat More Healthfully?\nA: Fill up on nutrients the body needs—vitamins, minerals, complex carbs, lean protein, and healthy fats—by eating a varied diet of nutrient-dense foods like fruits, vegetables, whole grains, lean meats, eggs, beans, and nuts.\n\nQ: What is Juicing?\nA: Juicing is the process of taking vegetables or fruit and extracting the juices for drinking rather than eating the whole fruit or vegetable. Juicing is a fast way for your body to take in great amounts of healthy nutrients since nothing needs to be broken down by your digestive system. When juicing you can take in more nutrients than you could by eating fruits and vegetables.\n\nQ: How is juicing healthier than just eating the fruits and vegetables?\nA: When you eat a vegetable your body has to digest and extract the nutrients from it. This provides the nutrients to your body but at a very slow pace. When you juice a vegetable, your body does not have to go through the digestion and extraction process and therefor the nutrition is readily available to you at the time of consumption. It’s like the difference of driving from Los Angeles to New York, or walking from your living room to your kitchen. Those nutrients are there almost instantly for your body to absorb and use.\n\nQ: Is it OK to eat red meat?\nA:  Yes, it is OK to eat red meat. Red meat such as Welsh Lamb and Welsh Beef can be eaten as part of a healthy balanced diet. In fact, if you eradicated red meat completely from your diet, you could be doing yourself a disservice. The quality of the nutrients in red meat in particular make it easier for the body to use them efficiently. You can enjoy red meat and get the most out of it if you eat it lean and in moderation.\n\nQ: Why do I need iron in my diet?\nA: Iron is a mineral which is required by the body for several different roles in the body including making red blood cells which transport oxygen around the body. If we don’t get enough iron we are at risk of developing iron deficiency anaemia, leaving us feeling tired, weak and irritable. Animal-based iron sources such as red meat which is a rich sources of iron and are most easily absorbed by the body. Did you know that while eating plenty of greens is a good thing, eating red meat alongside them can boost your iron status!\n\nQ: What Is Intermittent Fasting (IF)?\nA: Intermittent fasting (IF) is an eating pattern that cycles between periods of fasting and eating. It doesn’t specify which foods you should eat but rather when you should eat them. In this respect, it’s not a diet in the conventional sense but more accurately described as an eating pattern. Common intermittent fasting methods involve daily 16-hour fasts or fasting for 24 hours, twice per week. Fasting has been a practice throughout human evolution. Ancient hunter-gatherers didn’t have supermarkets, refrigerators or food available year-round. Sometimes they couldn’t find anything to eat. As a result, humans evolved to be able to function without food for extended periods of time. In fact, fasting from time to time is more natural than always eating 3–4 (or more) meals per day. Fasting is also often done for religious or spiritual reasons, including in Islam, Christianity, Judaism and Buddhism.\n\n\nQ: {{input}}\nA: " +
        questions,
      temperature: 0.7,
      max_tokens: 461,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        if (data.ok) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
        return data.json();
      })
      .then((data) => {
        setAdvice(data.choices[0].text.trim()); // Positive or negative
      });
  }

  return (
    <div
      style={{
        width: "100%",
        height: "240px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "90%" }}>
        <div style={{ width: "30%" }}>
          <TextArea
            rows={1}
            onChange={(e) => setQuestions(e.target.value)}
            placeholder="Paste your questions here! Or type, whatever suits you."
            allowClear
          />
        </div>
        <Button
          style={{ marginTop: "3px", marginRight: "3px" }}
          onClick={callOpenAIAPI}
          enterButton
        >
          Get Your Advice
        </Button>
        {loading ? (
          <Spin size="small"></Spin>
        ) : (
          <div style={{ marginTop: "10px", fontWeight: "450" }}>
            Advice: {advice}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainBody;
