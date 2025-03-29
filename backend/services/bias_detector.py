from textblob import TextBlob

def detect_bias(predictions):
    flags = []

    gender_keywords = {"man", "woman", "he", "she", "male", "female"}
    race_keywords = {"black", "white", "asian", "latino", "hispanic", "african"}
    religion_keywords = {"muslim", "christian", "jewish", "hindu", "buddhist"}

    for category, keywords in {
        "Gender": gender_keywords,
        "Race": race_keywords,
        "Religion": religion_keywords
    }.items():
        found = set(predictions).intersection(keywords)
        if found:
            flags.append(f"{category} bias likely: {list(found)}")

    sentiment = TextBlob(predictions[0]).sentiment.polarity
    sentiment_label = "negative" if sentiment < -0.3 else "positive" if sentiment > 0.3 else "neutral"

    return flags, sentiment_label