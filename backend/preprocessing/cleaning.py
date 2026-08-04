import re
import html
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory

stopword_factory = StopWordRemoverFactory()
STOPWORDS = set(stopword_factory.get_stop_words())

EXTRA_STOPWORDS = {
    "kompas", "detik", "antara", "cnbc", "cnn", "tempo", "liputan", "liputan6",
    "com", "co", "id", "news", "portal", "resmi", "pemprov", "kementerian",
    "wib", "jakarta"
}
STOPWORDS |= EXTRA_STOPWORDS


def strip_source_suffix(judul):
    """Google News nulis judul sbg 'Isi Berita - Nama Media'. Buang bagian sumbernya."""
    if not isinstance(judul, str):
        return ""
    return judul.split(" - ")[0].strip()


def clean_text(text):
    if not isinstance(text, str):
        return ""
    text = html.unescape(text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"http\S+|www\.\S+", " ", text)
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def remove_stopwords(text, dynamic_stopwords=None):
    if dynamic_stopwords is None:
        dynamic_stopwords = set()
    words = text.split()
    words = [w for w in words if w not in STOPWORDS and w not in dynamic_stopwords and len(w) > 2]
    return " ".join(words)


def preprocess_dataframe(df, search_keyword="", custom_stopwords_input=""):
    df = df.copy()

    # Generate dynamic stopwords from search keyword and custom input
    dynamic_stopwords = set()
    if search_keyword:
        dynamic_stopwords.update(search_keyword.lower().split())
    if custom_stopwords_input:
        custom_words = [w.strip().lower() for w in custom_stopwords_input.split(",")]
        dynamic_stopwords.update(custom_words)

    judul_inti = df["judul"].fillna("").apply(strip_source_suffix)
    content = df["content"].fillna("")

    same_as_judul = content.str.strip() == df["judul"].fillna("").str.strip()
    content_dedup = content.where(~same_as_judul, "")

    df["text"] = (judul_inti + " " + content_dedup).str.strip()

    df["clean_text"] = df["text"].apply(clean_text)
    df["clean_text"] = df["clean_text"].apply(lambda x: remove_stopwords(x, dynamic_stopwords))

    return df