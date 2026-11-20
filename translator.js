/* =================================================================
   NihongoTranslate — translator.js
   Full translation engine based on Minna no Nihongo curriculum
   Lessons 1-25 vocabulary, grammar patterns, kana-only output
   ================================================================= */

'use strict';

// ============================================================
// 1. VOCABULARY DATABASE (Minna no Nihongo L1-L25)
// ============================================================
const VOCAB = [
  // ---- GREETINGS & DAILY EXPRESSIONS ----
  { en: 'good morning', ja: 'おはようございます', romaji: 'ohayou gozaimasu', category: 'Greetings' },
  { en: 'hello / good afternoon', ja: 'こんにちは', romaji: 'konnichiwa', category: 'Greetings' },
  { en: 'good evening', ja: 'こんばんは', romaji: 'konbanwa', category: 'Greetings' },
  { en: 'good night', ja: 'おやすみなさい', romaji: 'oyasumi nasai', category: 'Greetings' },
  { en: 'goodbye', ja: 'さようなら', romaji: 'sayounara', category: 'Greetings' },
  { en: 'see you', ja: 'じゃあ、また', romaji: 'jaa, mata', category: 'Greetings' },
  { en: 'thank you', ja: 'ありがとうございます', romaji: 'arigatou gozaimasu', category: 'Greetings' },
  { en: 'thank you very much', ja: 'どうもありがとうございます', romaji: 'doumo arigatou gozaimasu', category: 'Greetings' },
  { en: 'you are welcome', ja: 'どういたしまして', romaji: 'dou itashimashite', category: 'Greetings' },
  { en: 'excuse me / sorry', ja: 'すみません', romaji: 'sumimasen', category: 'Greetings' },
  { en: 'I am sorry', ja: 'もうしわけありません', romaji: 'moushiwake arimasen', category: 'Greetings' },
  { en: 'please', ja: 'おねがいします', romaji: 'onegai shimasu', category: 'Greetings' },
  { en: 'please (give me)', ja: 'ください', romaji: 'kudasai', category: 'Greetings' },
  { en: 'yes', ja: 'はい', romaji: 'hai', category: 'Basic Words' },
  { en: 'no', ja: 'いいえ', romaji: 'iie', category: 'Basic Words' },
  { en: 'that is right', ja: 'そうです', romaji: 'sou desu', category: 'Basic Words' },
  { en: 'really', ja: 'ほんとうですか', romaji: 'hontou desu ka', category: 'Basic Words' },
  { en: 'I see / I understand', ja: 'わかりました', romaji: 'wakarimashita', category: 'Basic Words' },
  { en: 'I do not understand', ja: 'わかりません', romaji: 'wakarimasen', category: 'Basic Words' },
  { en: 'I know', ja: 'しっています', romaji: 'shitte imasu', category: 'Basic Words' },
  { en: 'I do not know', ja: 'しりません', romaji: 'shirimasen', category: 'Basic Words' },
  { en: 'one more time / please repeat', ja: 'もういちど おねがいします', romaji: 'mou ichido onegai shimasu', category: 'Basic Words' },
  { en: 'slowly please', ja: 'ゆっくり おねがいします', romaji: 'yukkuri onegai shimasu', category: 'Basic Words' },

  // ---- PRONOUNS & PEOPLE ----
  { en: 'I / me', ja: 'わたし', romaji: 'watashi', category: 'Pronouns' },
  { en: 'you', ja: 'あなた', romaji: 'anata', category: 'Pronouns' },
  { en: 'he / that man', ja: 'かれ', romaji: 'kare', category: 'Pronouns' },
  { en: 'she / that woman', ja: 'かのじょ', romaji: 'kanojo', category: 'Pronouns' },
  { en: 'we / us', ja: 'わたしたち', romaji: 'watashitachi', category: 'Pronouns' },
  { en: 'they', ja: 'かれら', romaji: 'karera', category: 'Pronouns' },
  { en: 'everyone / all', ja: 'みんな', romaji: 'minna', category: 'Pronouns' },
  { en: 'friend', ja: 'ともだち', romaji: 'tomodachi', category: 'People' },
  { en: 'person', ja: 'ひと', romaji: 'hito', category: 'People' },
  { en: 'man', ja: 'おとこのひと', romaji: 'otoko no hito', category: 'People' },
  { en: 'woman', ja: 'おんなのひと', romaji: 'onna no hito', category: 'People' },
  { en: 'child', ja: 'こども', romaji: 'kodomo', category: 'People' },
  { en: 'student', ja: 'がくせい', romaji: 'gakusei', category: 'People' },
  { en: 'teacher', ja: 'せんせい', romaji: 'sensei', category: 'People' },
  { en: 'doctor', ja: 'いしゃ', romaji: 'isha', category: 'People' },
  { en: 'company employee', ja: 'かいしゃいん', romaji: 'kaishain', category: 'People' },
  { en: 'engineer', ja: 'エンジニア', romaji: 'enjinia', category: 'People' },
  { en: 'policeman', ja: 'おまわりさん', romaji: 'omawarisan', category: 'People' },
  { en: 'Mr / Ms / Mrs', ja: 'さん', romaji: 'san', category: 'People' },

  // ---- FAMILY ----
  { en: 'family', ja: 'かぞく', romaji: 'kazoku', category: 'Family' },
  { en: 'father', ja: 'ちち', romaji: 'chichi', category: 'Family' },
  { en: 'mother', ja: 'はは', romaji: 'haha', category: 'Family' },
  { en: 'father (someone else\'s)', ja: 'おとうさん', romaji: 'otousan', category: 'Family' },
  { en: 'mother (someone else\'s)', ja: 'おかあさん', romaji: 'okaasan', category: 'Family' },
  { en: 'older brother', ja: 'あに', romaji: 'ani', category: 'Family' },
  { en: 'older sister', ja: 'あね', romaji: 'ane', category: 'Family' },
  { en: 'younger brother', ja: 'おとうと', romaji: 'otouto', category: 'Family' },
  { en: 'younger sister', ja: 'いもうと', romaji: 'imouto', category: 'Family' },
  { en: 'husband', ja: 'おっと', romaji: 'otto', category: 'Family' },
  { en: 'wife', ja: 'つま', romaji: 'tsuma', category: 'Family' },
  { en: 'son', ja: 'むすこ', romaji: 'musuko', category: 'Family' },
  { en: 'daughter', ja: 'むすめ', romaji: 'musume', category: 'Family' },

  // ---- NUMBERS ----
  { en: 'zero', ja: 'ゼロ', romaji: 'zero', category: 'Numbers' },
  { en: 'one', ja: 'いち', romaji: 'ichi', category: 'Numbers' },
  { en: 'two', ja: 'に', romaji: 'ni', category: 'Numbers' },
  { en: 'three', ja: 'さん', romaji: 'san', category: 'Numbers' },
  { en: 'four', ja: 'し / よん', romaji: 'shi / yon', category: 'Numbers' },
  { en: 'five', ja: 'ご', romaji: 'go', category: 'Numbers' },
  { en: 'six', ja: 'ろく', romaji: 'roku', category: 'Numbers' },
  { en: 'seven', ja: 'しち / なな', romaji: 'shichi / nana', category: 'Numbers' },
  { en: 'eight', ja: 'はち', romaji: 'hachi', category: 'Numbers' },
  { en: 'nine', ja: 'く / きゅう', romaji: 'ku / kyuu', category: 'Numbers' },
  { en: 'ten', ja: 'じゅう', romaji: 'juu', category: 'Numbers' },
  { en: 'hundred', ja: 'ひゃく', romaji: 'hyaku', category: 'Numbers' },
  { en: 'thousand', ja: 'せん', romaji: 'sen', category: 'Numbers' },
  { en: 'ten thousand', ja: 'まん', romaji: 'man', category: 'Numbers' },

  // ---- TIME ----
  { en: 'now', ja: 'いま', romaji: 'ima', category: 'Time' },
  { en: 'today', ja: 'きょう', romaji: 'kyou', category: 'Time' },
  { en: 'tomorrow', ja: 'あした', romaji: 'ashita', category: 'Time' },
  { en: 'yesterday', ja: 'きのう', romaji: 'kinou', category: 'Time' },
  { en: 'morning', ja: 'あさ', romaji: 'asa', category: 'Time' },
  { en: 'afternoon', ja: 'ひる', romaji: 'hiru', category: 'Time' },
  { en: 'evening', ja: 'ばん', romaji: 'ban', category: 'Time' },
  { en: 'night', ja: 'よる', romaji: 'yoru', category: 'Time' },
  { en: 'every day', ja: 'まいにち', romaji: 'mainichi', category: 'Time' },
  { en: 'every morning', ja: 'まいあさ', romaji: 'maiasa', category: 'Time' },
  { en: 'this week', ja: 'こんしゅう', romaji: 'konshuu', category: 'Time' },
  { en: 'next week', ja: 'らいしゅう', romaji: 'raishuu', category: 'Time' },
  { en: 'last week', ja: 'せんしゅう', romaji: 'senshuu', category: 'Time' },
  { en: 'this month', ja: 'こんげつ', romaji: 'kongetsu', category: 'Time' },
  { en: 'next month', ja: 'らいげつ', romaji: 'raigetsu', category: 'Time' },
  { en: 'this year', ja: 'ことし', romaji: 'kotoshi', category: 'Time' },
  { en: 'next year', ja: 'らいねん', romaji: 'rainen', category: 'Time' },
  { en: 'last year', ja: 'きょねん', romaji: 'kyonen', category: 'Time' },
  { en: 'Monday', ja: 'げつようび', romaji: 'getsuyoubi', category: 'Time' },
  { en: 'Tuesday', ja: 'かようび', romaji: 'kayoubi', category: 'Time' },
  { en: 'Wednesday', ja: 'すいようび', romaji: 'suiyoubi', category: 'Time' },
  { en: 'Thursday', ja: 'もくようび', romaji: 'mokuyoubi', category: 'Time' },
  { en: 'Friday', ja: 'きんようび', romaji: 'kinyoubi', category: 'Time' },
  { en: 'Saturday', ja: 'どようび', romaji: 'doyoubi', category: 'Time' },
  { en: 'Sunday', ja: 'にちようび', romaji: 'nichiyoubi', category: 'Time' },
  { en: 'o\'clock', ja: 'じ', romaji: 'ji', category: 'Time' },
  { en: 'minute', ja: 'ふん / ぷん', romaji: 'fun / pun', category: 'Time' },
  { en: 'half past', ja: 'はん', romaji: 'han', category: 'Time' },

  // ---- PLACES ----
  { en: 'here', ja: 'ここ', romaji: 'koko', category: 'Location' },
  { en: 'there (near you)', ja: 'そこ', romaji: 'soko', category: 'Location' },
  { en: 'over there', ja: 'あそこ', romaji: 'asoko', category: 'Location' },
  { en: 'where', ja: 'どこ', romaji: 'doko', category: 'Location' },
  { en: 'school', ja: 'がっこう', romaji: 'gakkou', category: 'Places' },
  { en: 'university', ja: 'だいがく', romaji: 'daigaku', category: 'Places' },
  { en: 'company', ja: 'かいしゃ', romaji: 'kaisha', category: 'Places' },
  { en: 'hospital', ja: 'びょういん', romaji: 'byouin', category: 'Places' },
  { en: 'bank', ja: 'ぎんこう', romaji: 'ginkou', category: 'Places' },
  { en: 'station', ja: 'えき', romaji: 'eki', category: 'Places' },
  { en: 'hotel', ja: 'ホテル', romaji: 'hoteru', category: 'Places' },
  { en: 'restaurant', ja: 'レストラン', romaji: 'resutoran', category: 'Places' },
  { en: 'store / shop', ja: 'みせ', romaji: 'mise', category: 'Places' },
  { en: 'supermarket', ja: 'スーパー', romaji: 'suupaa', category: 'Places' },
  { en: 'convenience store', ja: 'コンビニ', romaji: 'konbini', category: 'Places' },
  { en: 'post office', ja: 'ゆうびんきょく', romaji: 'yuubinkyoku', category: 'Places' },
  { en: 'library', ja: 'としょかん', romaji: 'toshokan', category: 'Places' },
  { en: 'park', ja: 'こうえん', romaji: 'kouen', category: 'Places' },
  { en: 'airport', ja: 'くうこう', romaji: 'kuukou', category: 'Places' },
  { en: 'home / house', ja: 'いえ', romaji: 'ie', category: 'Places' },
  { en: 'room', ja: 'へや', romaji: 'heya', category: 'Places' },

  // ---- FOOD & DRINK ----
  { en: 'food', ja: 'たべもの', romaji: 'tabemono', category: 'Food' },
  { en: 'drink', ja: 'のみもの', romaji: 'nomimono', category: 'Food' },
  { en: 'breakfast', ja: 'あさごはん', romaji: 'asagohan', category: 'Food' },
  { en: 'lunch', ja: 'ひるごはん', romaji: 'hirugohan', category: 'Food' },
  { en: 'dinner', ja: 'ばんごはん', romaji: 'bangohan', category: 'Food' },
  { en: 'rice / meal', ja: 'ごはん', romaji: 'gohan', category: 'Food' },
  { en: 'bread', ja: 'パン', romaji: 'pan', category: 'Food' },
  { en: 'egg', ja: 'たまご', romaji: 'tamago', category: 'Food' },
  { en: 'meat', ja: 'にく', romaji: 'niku', category: 'Food' },
  { en: 'fish', ja: 'さかな', romaji: 'sakana', category: 'Food' },
  { en: 'vegetables', ja: 'やさい', romaji: 'yasai', category: 'Food' },
  { en: 'fruit', ja: 'くだもの', romaji: 'kudamono', category: 'Food' },
  { en: 'water', ja: 'みず', romaji: 'mizu', category: 'Food' },
  { en: 'tea', ja: 'おちゃ', romaji: 'ocha', category: 'Food' },
  { en: 'coffee', ja: 'コーヒー', romaji: 'koohii', category: 'Food' },
  { en: 'beer', ja: 'ビール', romaji: 'biiru', category: 'Food' },
  { en: 'milk', ja: 'ぎゅうにゅう', romaji: 'gyuunyuu', category: 'Food' },
  { en: 'sugar', ja: 'さとう', romaji: 'satou', category: 'Food' },
  { en: 'salt', ja: 'しお', romaji: 'shio', category: 'Food' },
  { en: 'sushi', ja: 'すし', romaji: 'sushi', category: 'Food' },
  { en: 'ramen', ja: 'ラーメン', romaji: 'raamen', category: 'Food' },

  // ---- ADJECTIVES ----
  { en: 'big / large', ja: 'おおきい', romaji: 'ookii', category: 'Adjectives' },
  { en: 'small / little', ja: 'ちいさい', romaji: 'chiisai', category: 'Adjectives' },
  { en: 'new', ja: 'あたらしい', romaji: 'atarashii', category: 'Adjectives' },
  { en: 'old (thing)', ja: 'ふるい', romaji: 'furui', category: 'Adjectives' },
  { en: 'good', ja: 'いい', romaji: 'ii', category: 'Adjectives' },
  { en: 'bad', ja: 'わるい', romaji: 'warui', category: 'Adjectives' },
  { en: 'expensive', ja: 'たかい', romaji: 'takai', category: 'Adjectives' },
  { en: 'cheap / low', ja: 'やすい', romaji: 'yasui', category: 'Adjectives' },
  { en: 'hot (temperature)', ja: 'あつい', romaji: 'atsui', category: 'Adjectives' },
  { en: 'cold (temperature)', ja: 'さむい', romaji: 'samui', category: 'Adjectives' },
  { en: 'cold (thing / food)', ja: 'つめたい', romaji: 'tsumetai', category: 'Adjectives' },
  { en: 'warm', ja: 'あたたかい', romaji: 'atatakai', category: 'Adjectives' },
  { en: 'beautiful / clean', ja: 'きれいな', romaji: 'kirei na', category: 'Adjectives' },
  { en: 'interesting / fun', ja: 'おもしろい', romaji: 'omoshiroi', category: 'Adjectives' },
  { en: 'boring', ja: 'つまらない', romaji: 'tsumaranai', category: 'Adjectives' },
  { en: 'difficult / hard', ja: 'むずかしい', romaji: 'muzukashii', category: 'Adjectives' },
  { en: 'easy / simple', ja: 'やさしい', romaji: 'yasashii', category: 'Adjectives' },
  { en: 'kind / gentle', ja: 'しんせつな', romaji: 'shinsetsu na', category: 'Adjectives' },
  { en: 'quiet', ja: 'しずかな', romaji: 'shizuka na', category: 'Adjectives' },
  { en: 'lively / busy', ja: 'にぎやかな', romaji: 'nigiyaka na', category: 'Adjectives' },
  { en: 'convenient', ja: 'べんりな', romaji: 'benri na', category: 'Adjectives' },
  { en: 'healthy / fine', ja: 'げんきな', romaji: 'genki na', category: 'Adjectives' },
  { en: 'skillful / good at', ja: 'じょうずな', romaji: 'jouzu na', category: 'Adjectives' },
  { en: 'unskillful / bad at', ja: 'へたな', romaji: 'heta na', category: 'Adjectives' },
  { en: 'favorite / like', ja: 'すきな', romaji: 'suki na', category: 'Adjectives' },
  { en: 'dislike', ja: 'きらいな', romaji: 'kirai na', category: 'Adjectives' },
  { en: 'important', ja: 'たいせつな', romaji: 'taisetsu na', category: 'Adjectives' },
  { en: 'famous', ja: 'ゆうめいな', romaji: 'yuumei na', category: 'Adjectives' },
  { en: 'long', ja: 'ながい', romaji: 'nagai', category: 'Adjectives' },
  { en: 'short (length)', ja: 'みじかい', romaji: 'mijikai', category: 'Adjectives' },
  { en: 'tall / high', ja: 'たかい', romaji: 'takai', category: 'Adjectives' },
  { en: 'low / short (height)', ja: 'ひくい', romaji: 'hikui', category: 'Adjectives' },
  { en: 'fast / quick', ja: 'はやい', romaji: 'hayai', category: 'Adjectives' },
  { en: 'slow', ja: 'おそい', romaji: 'osoi', category: 'Adjectives' },
  { en: 'many / a lot', ja: 'おおい', romaji: 'ooi', category: 'Adjectives' },
  { en: 'few / a little', ja: 'すくない', romaji: 'sukunai', category: 'Adjectives' },
  { en: 'heavy', ja: 'おもい', romaji: 'omoi', category: 'Adjectives' },
  { en: 'light (weight)', ja: 'かるい', romaji: 'karui', category: 'Adjectives' },

  // ---- VERBS (dictionary / masu forms) ----
  { en: 'to eat', ja: 'たべます', romaji: 'tabemasu', category: 'Verbs' },
  { en: 'to drink', ja: 'のみます', romaji: 'nomimasu', category: 'Verbs' },
  { en: 'to see / look / watch', ja: 'みます', romaji: 'mimasu', category: 'Verbs' },
  { en: 'to listen / hear', ja: 'ききます', romaji: 'kikimasu', category: 'Verbs' },
  { en: 'to speak / talk', ja: 'はなします', romaji: 'hanashimasu', category: 'Verbs' },
  { en: 'to read', ja: 'よみます', romaji: 'yomimasu', category: 'Verbs' },
  { en: 'to write', ja: 'かきます', romaji: 'kakimasu', category: 'Verbs' },
  { en: 'to buy', ja: 'かいます', romaji: 'kaimasu', category: 'Verbs' },
  { en: 'to go', ja: 'いきます', romaji: 'ikimasu', category: 'Verbs' },
  { en: 'to come', ja: 'きます', romaji: 'kimasu', category: 'Verbs' },
  { en: 'to return / go home', ja: 'かえります', romaji: 'kaerimasu', category: 'Verbs' },
  { en: 'to get up / wake up', ja: 'おきます', romaji: 'okimasu', category: 'Verbs' },
  { en: 'to sleep / go to bed', ja: 'ねます', romaji: 'nemasu', category: 'Verbs' },
  { en: 'to work', ja: 'はたらきます', romaji: 'hatarakimasu', category: 'Verbs' },
  { en: 'to study', ja: 'べんきょうします', romaji: 'benkyou shimasu', category: 'Verbs' },
  { en: 'to do', ja: 'します', romaji: 'shimasu', category: 'Verbs' },
  { en: 'to exist / be (animate)', ja: 'います', romaji: 'imasu', category: 'Verbs' },
  { en: 'to exist / be (inanimate)', ja: 'あります', romaji: 'arimasu', category: 'Verbs' },
  { en: 'to understand', ja: 'わかります', romaji: 'wakarimasu', category: 'Verbs' },
  { en: 'to know', ja: 'しっています', romaji: 'shitte imasu', category: 'Verbs' },
  { en: 'to meet', ja: 'あいます', romaji: 'aimasu', category: 'Verbs' },
  { en: 'to wait', ja: 'まちます', romaji: 'machimasu', category: 'Verbs' },
  { en: 'to get off / descend', ja: 'おります', romaji: 'orimasu', category: 'Verbs' },
  { en: 'to get on / board', ja: 'のります', romaji: 'norimasu', category: 'Verbs' },
  { en: 'to open', ja: 'あけます', romaji: 'akemasu', category: 'Verbs' },
  { en: 'to close / shut', ja: 'しめます', romaji: 'shimemasu', category: 'Verbs' },
  { en: 'to turn on', ja: 'つけます', romaji: 'tsukemasu', category: 'Verbs' },
  { en: 'to turn off', ja: 'けします', romaji: 'keshimasu', category: 'Verbs' },
  { en: 'to put / place', ja: 'おきます', romaji: 'okimasu', category: 'Verbs' },
  { en: 'to give', ja: 'あげます', romaji: 'agemasu', category: 'Verbs' },
  { en: 'to receive', ja: 'もらいます', romaji: 'moraimasu', category: 'Verbs' },
  { en: 'to call / telephone', ja: 'でんわします', romaji: 'denwa shimasu', category: 'Verbs' },
  { en: 'to arrive', ja: 'つきます', romaji: 'tsukimasu', category: 'Verbs' },
  { en: 'to start / begin', ja: 'はじめます', romaji: 'hajimemasu', category: 'Verbs' },
  { en: 'to finish / end', ja: 'おわります', romaji: 'owarimasu', category: 'Verbs' },
  { en: 'to wash', ja: 'あらいます', romaji: 'araimasu', category: 'Verbs' },
  { en: 'to clean', ja: 'そうじします', romaji: 'souji shimasu', category: 'Verbs' },
  { en: 'to cook', ja: 'りょうりします', romaji: 'ryouri shimasu', category: 'Verbs' },
  { en: 'to swim', ja: 'およぎます', romaji: 'oyogimasu', category: 'Verbs' },
  { en: 'to run', ja: 'はしります', romaji: 'hashirimasu', category: 'Verbs' },
  { en: 'to walk', ja: 'あるきます', romaji: 'arukimasu', category: 'Verbs' },
  { en: 'to sing', ja: 'うたいます', romaji: 'utaimasu', category: 'Verbs' },
  { en: 'to play (music)', ja: 'ひきます', romaji: 'hikimasu', category: 'Verbs' },

  // ---- THINGS / OBJECTS ----
  { en: 'book', ja: 'ほん', romaji: 'hon', category: 'Objects' },
  { en: 'magazine', ja: 'ざっし', romaji: 'zasshi', category: 'Objects' },
  { en: 'newspaper', ja: 'しんぶん', romaji: 'shinbun', category: 'Objects' },
  { en: 'pen', ja: 'ペン', romaji: 'pen', category: 'Objects' },
  { en: 'pencil', ja: 'えんぴつ', romaji: 'enpitsu', category: 'Objects' },
  { en: 'notebook', ja: 'ノート', romaji: 'nooto', category: 'Objects' },
  { en: 'bag / briefcase', ja: 'かばん', romaji: 'kaban', category: 'Objects' },
  { en: 'umbrella', ja: 'かさ', romaji: 'kasa', category: 'Objects' },
  { en: 'glasses', ja: 'めがね', romaji: 'megane', category: 'Objects' },
  { en: 'telephone', ja: 'でんわ', romaji: 'denwa', category: 'Objects' },
  { en: 'mobile phone', ja: 'けいたいでんわ', romaji: 'keitai denwa', category: 'Objects' },
  { en: 'computer', ja: 'パソコン', romaji: 'pasokon', category: 'Objects' },
  { en: 'television / TV', ja: 'テレビ', romaji: 'terebi', category: 'Objects' },
  { en: 'car', ja: 'くるま', romaji: 'kuruma', category: 'Objects' },
  { en: 'bicycle', ja: 'じてんしゃ', romaji: 'jitensha', category: 'Objects' },
  { en: 'ticket', ja: 'きっぷ', romaji: 'kippu', category: 'Objects' },
  { en: 'money', ja: 'おかね', romaji: 'okane', category: 'Objects' },
  { en: 'key', ja: 'かぎ', romaji: 'kagi', category: 'Objects' },
  { en: 'letter', ja: 'てがみ', romaji: 'tegami', category: 'Objects' },
  { en: 'photograph / picture', ja: 'しゃしん', romaji: 'shashin', category: 'Objects' },
  { en: 'medicine', ja: 'くすり', romaji: 'kusuri', category: 'Objects' },

  // ---- NATURE & WEATHER ----
  { en: 'weather', ja: 'てんき', romaji: 'tenki', category: 'Nature' },
  { en: 'sunny / fine weather', ja: 'はれ', romaji: 'hare', category: 'Nature' },
  { en: 'rain', ja: 'あめ', romaji: 'ame', category: 'Nature' },
  { en: 'snow', ja: 'ゆき', romaji: 'yuki', category: 'Nature' },
  { en: 'wind', ja: 'かぜ', romaji: 'kaze', category: 'Nature' },
  { en: 'cloud', ja: 'くも', romaji: 'kumo', category: 'Nature' },
  { en: 'sky', ja: 'そら', romaji: 'sora', category: 'Nature' },
  { en: 'sea / ocean', ja: 'うみ', romaji: 'umi', category: 'Nature' },
  { en: 'mountain', ja: 'やま', romaji: 'yama', category: 'Nature' },
  { en: 'river', ja: 'かわ', romaji: 'kawa', category: 'Nature' },
  { en: 'flower', ja: 'はな', romaji: 'hana', category: 'Nature' },
  { en: 'tree', ja: 'き', romaji: 'ki', category: 'Nature' },

  // ---- HOBBIES & ACTIVITIES ----
  { en: 'hobby', ja: 'しゅみ', romaji: 'shumi', category: 'Hobbies' },
  { en: 'sport', ja: 'スポーツ', romaji: 'supootsu', category: 'Hobbies' },
  { en: 'music', ja: 'おんがく', romaji: 'ongaku', category: 'Hobbies' },
  { en: 'movie', ja: 'えいが', romaji: 'eiga', category: 'Hobbies' },
  { en: 'travel', ja: 'りょこう', romaji: 'ryokou', category: 'Hobbies' },
  { en: 'shopping', ja: 'かいもの', romaji: 'kaimono', category: 'Hobbies' },
  { en: 'cooking', ja: 'りょうり', romaji: 'ryouri', category: 'Hobbies' },
  { en: 'reading', ja: 'どくしょ', romaji: 'dokusho', category: 'Hobbies' },
  { en: 'photography', ja: 'しゃしんをとる', romaji: 'shashin wo toru', category: 'Hobbies' },
  { en: 'tennis', ja: 'テニス', romaji: 'tenisu', category: 'Hobbies' },
  { en: 'baseball', ja: 'やきゅう', romaji: 'yakyuu', category: 'Hobbies' },
  { en: 'swimming', ja: 'すいえい', romaji: 'suiei', category: 'Hobbies' },

  // ---- QUESTION WORDS ----
  { en: 'what', ja: 'なに', romaji: 'nani', category: 'Questions' },
  { en: 'who', ja: 'だれ', romaji: 'dare', category: 'Questions' },
  { en: 'when', ja: 'いつ', romaji: 'itsu', category: 'Questions' },
  { en: 'where', ja: 'どこ', romaji: 'doko', category: 'Questions' },
  { en: 'why', ja: 'なぜ / どうして', romaji: 'naze / doushite', category: 'Questions' },
  { en: 'how', ja: 'どうやって', romaji: 'dou yatte', category: 'Questions' },
  { en: 'how much (price)', ja: 'いくら', romaji: 'ikura', category: 'Questions' },
  { en: 'how many', ja: 'いくつ', romaji: 'ikutsu', category: 'Questions' },
  { en: 'which (of two)', ja: 'どちら', romaji: 'dochira', category: 'Questions' },
  { en: 'which (of many)', ja: 'どれ', romaji: 'dore', category: 'Questions' },

  // ---- COLORS ----
  { en: 'red', ja: 'あかい', romaji: 'akai', category: 'Colors' },
  { en: 'blue', ja: 'あおい', romaji: 'aoi', category: 'Colors' },
  { en: 'white', ja: 'しろい', romaji: 'shiroi', category: 'Colors' },
  { en: 'black', ja: 'くろい', romaji: 'kuroi', category: 'Colors' },
  { en: 'yellow', ja: 'きいろい', romaji: 'kiiroi', category: 'Colors' },
  { en: 'green', ja: 'みどり', romaji: 'midori', category: 'Colors' },
  { en: 'pink', ja: 'ももいろ', romaji: 'momoiro', category: 'Colors' },

  // ---- BODY ----
  { en: 'head', ja: 'あたま', romaji: 'atama', category: 'Body' },
  { en: 'eye', ja: 'め', romaji: 'me', category: 'Body' },
  { en: 'ear', ja: 'みみ', romaji: 'mimi', category: 'Body' },
  { en: 'nose', ja: 'はな', romaji: 'hana', category: 'Body' },
  { en: 'mouth', ja: 'くち', romaji: 'kuchi', category: 'Body' },
  { en: 'hand', ja: 'て', romaji: 'te', category: 'Body' },
  { en: 'foot / leg', ja: 'あし', romaji: 'ashi', category: 'Body' },
  { en: 'stomach', ja: 'おなか', romaji: 'onaka', category: 'Body' },
  { en: 'back', ja: 'せなか', romaji: 'senaka', category: 'Body' },
  { en: 'face', ja: 'かお', romaji: 'kao', category: 'Body' },
];

// ============================================================
// 2. SENTENCE / PHRASE DATABASE
// ============================================================
const PHRASES = [
  { en: 'I am a student.', ja: 'わたしは がくせい です。', romaji: 'Watashi wa gakusei desu.', note: 'Basic identity sentence using は (wa) + です (desu)' },
  { en: 'I am not a teacher.', ja: 'わたしは せんせい では ありません。', romaji: 'Watashi wa sensei de wa arimasen.', note: 'Negative form of です → では ありません' },
  { en: 'Are you a student?', ja: 'あなたは がくせい ですか。', romaji: 'Anata wa gakusei desu ka.', note: 'Question formed by adding か (ka) at the end' },
  { en: 'This is a book.', ja: 'これは ほん です。', romaji: 'Kore wa hon desu.', note: 'これ (kore) = this thing near the speaker' },
  { en: 'That is a pen.', ja: 'それは ペン です。', romaji: 'Sore wa pen desu.', note: 'それ (sore) = that thing near the listener' },
  { en: 'That over there is a bag.', ja: 'あれは かばん です。', romaji: 'Are wa kaban desu.', note: 'あれ (are) = that thing away from both' },
  { en: 'Where is the toilet?', ja: 'トイレは どこ ですか。', romaji: 'Toire wa doko desu ka.', note: 'どこ (doko) = where' },
  { en: 'Please give me water.', ja: 'みずを ください。', romaji: 'Mizu wo kudasai.', note: 'を (wo) marks the direct object; ください = please give' },
  { en: 'I go to school.', ja: 'わたしは がっこうへ いきます。', romaji: 'Watashi wa gakkou e ikimasu.', note: 'へ (e) marks direction of movement' },
  { en: 'I ate sushi.', ja: 'わたしは すしを たべました。', romaji: 'Watashi wa sushi wo tabemashita.', note: 'Past tense: たべます → たべました' },
  { en: 'I will drink coffee.', ja: 'わたしは コーヒーを のみます。', romaji: 'Watashi wa koohii wo nomimasu.', note: 'Present/future tense masu-form' },
  { en: 'Do you like sushi?', ja: 'すしが すきですか。', romaji: 'Sushi ga suki desu ka.', note: 'が (ga) marks the subject of a state/feeling verb' },
  { en: 'I like music.', ja: 'おんがくが すきです。', romaji: 'Ongaku ga suki desu.', note: 'すきです (suki desu) = like' },
  { en: 'How much is this?', ja: 'これは いくら ですか。', romaji: 'Kore wa ikura desu ka.', note: 'いくら (ikura) = how much (price)' },
  { en: 'Please wait a moment.', ja: 'ちょっと まってください。', romaji: 'Chotto matte kudasai.', note: 'てください = please do (te-form request)' },
  { en: 'May I take a photo?', ja: 'しゃしんを とっても いいですか。', romaji: 'Shashin wo totte mo ii desu ka.', note: 'てもいいですか = may I / is it okay to?' },
  { en: 'I cannot speak Japanese well.', ja: 'にほんごが あまり はなせません。', romaji: 'Nihongo ga amari hanasemasen.', note: 'Potential negative form; あまり = not very much' },
  { en: 'Is there a hospital near here?', ja: 'このちかくに びょういんが ありますか。', romaji: 'Kono chikaku ni byouin ga arimasu ka.', note: 'に (ni) marks location; あります = there is (inanimate)' },
  { en: 'I have a cold.', ja: 'かぜを ひいています。', romaji: 'Kaze wo hiite imasu.', note: 'ています = current state/ongoing action' },
  { en: 'Let\'s eat together.', ja: 'いっしょに たべましょう。', romaji: 'Issho ni tabemashou.', note: 'ましょう = let\'s do (invitation)' },
  { en: 'I want to go to Japan.', ja: 'にほんへ いきたいです。', romaji: 'Nihon e ikitai desu.', note: 'たいです = want to do (desire form)' },
  { en: 'Please turn left.', ja: 'ひだりへ まがってください。', romaji: 'Hidari e magatte kudasai.', note: 'Direction instruction using てください' },
  { en: 'I am fine.', ja: 'げんきです。', romaji: 'Genki desu.', note: 'Common response to "how are you?"' },
  { en: 'Nice to meet you.', ja: 'はじめまして。どうぞ よろしく おねがいします。', romaji: 'Hajimemashite. Douzo yoroshiku onegai shimasu.', note: 'Standard first-time greeting formula' },
];

// ============================================================
// 3. GRAMMAR PATTERNS DATABASE
// ============================================================
const GRAMMAR = [
  {
    lesson: 'Lesson 1',
    name: 'N は N です (Identity / State)',
    structure: '[Noun] は [Noun] です。',
    description: 'The basic sentence pattern for identifying or describing something. は (wa) is the topic marker; です (desu) is the polite copula meaning "is/am/are".',
    examples: [
      { ja: 'わたしは がくせい です。', romaji: 'Watashi wa gakusei desu.', en: 'I am a student.' },
      { ja: 'これは ほん です。', romaji: 'Kore wa hon desu.', en: 'This is a book.' },
      { ja: 'かれは いしゃ です。', romaji: 'Kare wa isha desu.', en: 'He is a doctor.' },
    ]
  },
  {
    lesson: 'Lesson 1',
    name: 'N は N では ありません (Negative Identity)',
    structure: '[Noun] は [Noun] では ありません。',
    description: 'The negative form of です. では ありません (de wa arimasen) means "is not". In casual speech: じゃありません (ja arimasen).',
    examples: [
      { ja: 'わたしは せんせい では ありません。', romaji: 'Watashi wa sensei de wa arimasen.', en: 'I am not a teacher.' },
      { ja: 'これは じしょ では ありません。', romaji: 'Kore wa jisho de wa arimasen.', en: 'This is not a dictionary.' },
    ]
  },
  {
    lesson: 'Lesson 1',
    name: 'ですか (Question)',
    structure: '[Statement] ですか。',
    description: 'Adding か (ka) at the end turns a statement into a yes/no question. No change in word order needed (unlike English).',
    examples: [
      { ja: 'あなたは がくせい ですか。', romaji: 'Anata wa gakusei desu ka.', en: 'Are you a student?' },
      { ja: 'それは じしょ ですか。', romaji: 'Sore wa jisho desu ka.', en: 'Is that a dictionary?' },
    ]
  },
  {
    lesson: 'Lesson 2',
    name: 'これ / それ / あれ / どれ (Demonstratives)',
    structure: 'これ (this) / それ (that) / あれ (that over there) / どれ (which)',
    description: 'これ refers to something near the speaker, それ near the listener, あれ away from both, and どれ asks "which one?".',
    examples: [
      { ja: 'これは なに ですか。', romaji: 'Kore wa nani desu ka.', en: 'What is this?' },
      { ja: 'あれは わたしの かばん です。', romaji: 'Are wa watashi no kaban desu.', en: 'That over there is my bag.' },
    ]
  },
  {
    lesson: 'Lesson 3',
    name: 'N の N (Possession / Noun Modification)',
    structure: '[Noun1] の [Noun2]',
    description: 'の (no) connects nouns to show possession, affiliation, or modification. Similar to "\'s" or "of" in English.',
    examples: [
      { ja: 'わたしの ほん', romaji: 'Watashi no hon', en: 'My book' },
      { ja: 'にほんの くるま', romaji: 'Nihon no kuruma', en: 'Japanese car' },
      { ja: 'がっこうの せんせい', romaji: 'Gakkou no sensei', en: 'The school\'s teacher' },
    ]
  },
  {
    lesson: 'Lesson 4',
    name: 'N に いきます / きます / かえります (Movement Verbs)',
    structure: '[Place] に / へ いきます | きます | かえります',
    description: 'に (ni) or へ (e) marks the destination of movement verbs: いきます (go), きます (come), かえります (return/go home).',
    examples: [
      { ja: 'がっこうへ いきます。', romaji: 'Gakkou e ikimasu.', en: 'I go to school.' },
      { ja: 'うちに かえります。', romaji: 'Uchi ni kaerimasu.', en: 'I return home.' },
      { ja: 'にほんへ きました。', romaji: 'Nihon e kimashita.', en: 'I came to Japan.' },
    ]
  },
  {
    lesson: 'Lesson 4',
    name: 'Past Tense (ました / ませんでした)',
    structure: 'Verb stem + ました (positive) / ませんでした (negative)',
    description: 'Replace the present-tense ます ending with ました for past tense. The negative past is ませんでした.',
    examples: [
      { ja: 'えいがを みました。', romaji: 'Eiga wo mimashita.', en: 'I watched a movie.' },
      { ja: 'ゆうしょくを たべませんでした。', romaji: 'Yuushoku wo tabemasen deshita.', en: 'I did not eat dinner.' },
    ]
  },
  {
    lesson: 'Lesson 5',
    name: 'N で Verb (Location of Action)',
    structure: '[Place] で [Verb]',
    description: 'で (de) marks the location where an action takes place. Different from に which marks existence location.',
    examples: [
      { ja: 'としょかんで べんきょうします。', romaji: 'Toshokan de benkyou shimasu.', en: 'I study at the library.' },
      { ja: 'レストランで たべました。', romaji: 'Resutoran de tabemashita.', en: 'I ate at the restaurant.' },
    ]
  },
  {
    lesson: 'Lesson 6',
    name: 'N が あります / います (Existence)',
    structure: '[Place] に [Thing/Person] が あります / います',
    description: 'あります is used for inanimate objects; います for animate beings (people, animals). に marks the location.',
    examples: [
      { ja: 'つくえの うえに ほんが あります。', romaji: 'Tsukue no ue ni hon ga arimasu.', en: 'There is a book on the desk.' },
      { ja: 'こうえんに こどもが います。', romaji: 'Kouen ni kodomo ga imasu.', en: 'There are children in the park.' },
    ]
  },
  {
    lesson: 'Lesson 8',
    name: 'い-Adjective Patterns',
    structure: '[い-adj] です | [い-adj] + Noun | [い-adj stem] + くない です',
    description: 'い-adjectives end in い and conjugate directly. Remove い and add くない for negative, くて to connect adjectives.',
    examples: [
      { ja: 'このほんは おもしろいです。', romaji: 'Kono hon wa omoshiroi desu.', en: 'This book is interesting.' },
      { ja: 'きょうは さむくないです。', romaji: 'Kyou wa samuku nai desu.', en: 'Today is not cold.' },
      { ja: 'おおきくて あかい りんご', romaji: 'Ookikute akai ringo', en: 'A big, red apple' },
    ]
  },
  {
    lesson: 'Lesson 9',
    name: 'な-Adjective Patterns',
    structure: '[な-adj] な + Noun | [な-adj] です | [な-adj] では ありません',
    description: 'な-adjectives require な when modifying a noun directly. The polite forms use です and では ありません.',
    examples: [
      { ja: 'しずかな まち です。', romaji: 'Shizuka na machi desu.', en: 'It is a quiet town.' },
      { ja: 'にほんごは すきです。', romaji: 'Nihongo wa suki desu.', en: 'I like Japanese.' },
      { ja: 'へやは きれいでは ありません。', romaji: 'Heya wa kirei de wa arimasen.', en: 'The room is not clean.' },
    ]
  },
  {
    lesson: 'Lesson 11',
    name: 'V て ください (Request / Command)',
    structure: '[Verb te-form] ください',
    description: 'てください is a polite request "please do ~". Form the te-form by changing ます to て (or って, んで etc. based on verb group).',
    examples: [
      { ja: 'ゆっくり はなして ください。', romaji: 'Yukkuri hanashite kudasai.', en: 'Please speak slowly.' },
      { ja: 'ここに すわって ください。', romaji: 'Koko ni suwatte kudasai.', en: 'Please sit here.' },
      { ja: 'まどを あけて ください。', romaji: 'Mado wo akete kudasai.', en: 'Please open the window.' },
    ]
  },
  {
    lesson: 'Lesson 13',
    name: 'V たい です (Desire)',
    structure: '[Verb stem] たい です',
    description: 'たいです expresses the speaker\'s desire to do something. Remove ます and add たいです. It conjugates like an い-adjective.',
    examples: [
      { ja: 'コーヒーを のみたいです。', romaji: 'Koohii wo nomitai desu.', en: 'I want to drink coffee.' },
      { ja: 'にほんへ いきたいです。', romaji: 'Nihon e ikitai desu.', en: 'I want to go to Japan.' },
      { ja: 'なにを たべたいですか。', romaji: 'Nani wo tabetai desu ka.', en: 'What do you want to eat?' },
    ]
  },
  {
    lesson: 'Lesson 14',
    name: 'V て います (Progressive / State)',
    structure: '[Verb te-form] います',
    description: 'ています has two uses: (1) ongoing action like "is doing ~", (2) resultant state like "is wearing / has married".',
    examples: [
      { ja: 'いま たべています。', romaji: 'Ima tabete imasu.', en: 'I am eating now.' },
      { ja: 'かれは けっこんしています。', romaji: 'Kare wa kekkon shite imasu.', en: 'He is married.' },
      { ja: 'ゆきが ふっています。', romaji: 'Yuki ga futte imasu.', en: 'It is snowing.' },
    ]
  },
  {
    lesson: 'Lesson 15',
    name: 'V て も いいですか (Permission)',
    structure: '[Verb te-form] も いいですか',
    description: 'Asks for permission: "May I do ~?" The answer can be いいです (yes, fine) or いけません (no, not allowed).',
    examples: [
      { ja: 'しゃしんを とっても いいですか。', romaji: 'Shashin wo totte mo ii desu ka.', en: 'May I take a photo?' },
      { ja: 'ここで たべても いいですか。', romaji: 'Koko de tabete mo ii desu ka.', en: 'May I eat here?' },
    ]
  },
  {
    lesson: 'Lesson 18',
    name: 'Potential Form (V できます)',
    structure: 'V dictionary form + ことが できます | Potential verb form + ます',
    description: 'Expresses ability or possibility. できます is used with する-verbs and nouns. For other verbs, use the potential form.',
    examples: [
      { ja: 'にほんごが はなせます。', romaji: 'Nihongo ga hanasemasu.', en: 'I can speak Japanese.' },
      { ja: 'ピアノを ひくことが できます。', romaji: 'Piano wo hiku koto ga dekimasu.', en: 'I can play the piano.' },
      { ja: 'えいごが できますか。', romaji: 'Eigo ga dekimasu ka.', en: 'Can you speak English?' },
    ]
  },
];

// ============================================================
// 4. TRANSLATION ENGINE
// ============================================================

// Build lookup maps
const vocabMap = new Map();
const phraseMap = new Map();

VOCAB.forEach(v => {
  const keys = v.en.toLowerCase().split(' / ');
  keys.forEach(k => vocabMap.set(k.trim(), v));
});

PHRASES.forEach(p => {
  phraseMap.set(p.en.toLowerCase().trim(), p);
});

function normalize(str) {
  return str.toLowerCase()
    .replace(/[.,!?;:'"()\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function translateText(input) {
  const text = input.trim();
  if (!text) return null;

  const norm = normalize(text);

  // 1. Exact phrase match
  if (phraseMap.has(norm)) {
    return { type: 'phrase', data: phraseMap.get(norm) };
  }

  // 2. Partial phrase match (input is contained in a phrase)
  for (const [key, val] of phraseMap) {
    if (key === norm || key.includes(norm) || norm.includes(key.replace(/[.!?]/g, '').trim())) {
      return { type: 'phrase', data: val };
    }
  }

  // 3. Exact vocab match
  if (vocabMap.has(norm)) {
    return { type: 'word', data: vocabMap.get(norm) };
  }

  // 4. Try partial word tokens — tokenize input and translate word by word
  const words = norm.split(/\s+/);
  const tokens = [];
  let i = 0;
  while (i < words.length) {
    // Try bigram
    if (i + 1 < words.length) {
      const bigram = words[i] + ' ' + words[i + 1];
      if (vocabMap.has(bigram)) {
        tokens.push({ en: bigram, ...vocabMap.get(bigram) });
        i += 2;
        continue;
      }
    }
    // Try single word
    if (vocabMap.has(words[i])) {
      tokens.push({ en: words[i], ...vocabMap.get(words[i]) });
    } else {
      tokens.push({ en: words[i], ja: null, romaji: null });
    }
    i++;
  }

  const found = tokens.filter(t => t.ja);
  if (found.length > 0) {
    return { type: 'tokens', data: tokens };
  }

  // 5. Fuzzy search — find closest vocab
  const fuzzy = fuzzySearch(norm, 1);
  if (fuzzy.length > 0) {
    return { type: 'fuzzy', data: fuzzy };
  }

  return { type: 'notfound', data: null };
}

function fuzzySearch(query, limit = 3) {
  const results = [];
  for (const [key, val] of vocabMap) {
    const score = similarity(query, key);
    if (score > 0.4) results.push({ score, ...val });
  }
  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

function similarity(a, b) {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1.0;
  const dist = levenshtein(longer, shorter);
  return (longer.length - dist) / longer.length;
}

function levenshtein(s, t) {
  const m = s.length, n = t.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function getGrammarNote(input) {
  const norm = normalize(input);
  if (/\b(am|is|are)\b/.test(norm) && /\b(not)\b/.test(norm)) return GRAMMAR[1];
  if (/\b(am|is|are)\b/.test(norm)) return GRAMMAR[0];
  if (/\?/.test(input) || /\b(is|are|do|does|can|will|may|could|should)\b/.test(norm)) return GRAMMAR[2];
  if (/\b(want to)\b/.test(norm)) return GRAMMAR[12];
  if (/\b(please)\b/.test(norm)) return GRAMMAR[11];
  if (/\b(can|able to)\b/.test(norm)) return GRAMMAR[15];
  if (/\b(like|love|dislike|hate)\b/.test(norm)) return GRAMMAR[8];
  if (/\b(went|ate|drank|saw|read|watched|studied|did)\b/.test(norm)) return GRAMMAR[6];
  if (/\b(going|eating|drinking|studying|working|running)\b/.test(norm)) return GRAMMAR[13];
  if (/\b(may i|can i|is it okay)\b/.test(norm)) return GRAMMAR[14];
  return null;
}

// ============================================================
// 5. RENDER HELPERS
// ============================================================

function renderOutput(result, originalInput) {
  const area = document.getElementById('outputArea');
  const details = document.getElementById('resultDetails');
  const tokensEl = document.getElementById('resultTokens');
  const noteEl = document.getElementById('grammarNote');

  if (!result || result.type === 'notfound') {
    area.innerHTML = `
      <div class="translation-block">
        <div class="trans-ja" style="font-size:1.2rem;opacity:0.6">❓ Translation not found</div>
        <div class="trans-romaji" style="opacity:0.5">Try a simpler word or phrase from the vocabulary list</div>
        <div class="trans-meaning">Tip: Check the Vocab tab for supported words</div>
      </div>`;
    details.style.display = 'none';
    return;
  }

  let html = '';
  tokensEl.innerHTML = '';
  noteEl.innerHTML = '';

  if (result.type === 'phrase') {
    const p = result.data;
    html = `
      <div class="translation-block">
        <div class="trans-en">${p.en}</div>
        <div class="trans-ja">${p.ja}</div>
        <div class="trans-romaji">📢 ${p.romaji}</div>
        ${p.note ? `<div class="trans-meaning">💡 ${p.note}</div>` : ''}
      </div>`;
    if (p.note) {
      noteEl.innerHTML = `<strong>Grammar tip:</strong> ${p.note}`;
    }
  } else if (result.type === 'word') {
    const w = result.data;
    html = `
      <div class="translation-block">
        <div class="trans-en">${w.en}</div>
        <div class="trans-ja">${w.ja}</div>
        <div class="trans-romaji">📢 ${w.romaji}</div>
        <div class="trans-meaning">Category: ${w.category}</div>
      </div>`;
  } else if (result.type === 'tokens') {
    const found = result.data.filter(t => t.ja);
    const all = result.data;

    // Full sentence attempt
    const jaWords = all.map(t => t.ja || `[${t.en}]`).join('　');
    const romWords = all.map(t => t.romaji || t.en).join(' ');

    if (found.length === all.length) {
      html = `
        <div class="translation-block">
          <div class="trans-en">${originalInput}</div>
          <div class="trans-ja">${jaWords}</div>
          <div class="trans-romaji">📢 ${romWords}</div>
        </div>`;
    } else {
      html = `
        <div class="translation-block">
          <div class="trans-en" style="color:var(--clr-romaji)">Word-by-word translation:</div>
          ${found.map(t => `
            <div class="trans-block-row">
              <div class="trans-en">${t.en}</div>
              <div class="trans-ja">${t.ja}</div>
              <div class="trans-romaji">📢 ${t.romaji}</div>
            </div>
            <hr class="trans-separator">
          `).join('')}
        </div>`;
    }

    // Token pills
    all.forEach(t => {
      if (t.ja) {
        const pill = document.createElement('div');
        pill.className = 'token-pill';
        pill.innerHTML = `<span class="token-en">${t.en}</span><span class="token-ja">${t.ja}</span><span class="token-rom">${t.romaji}</span>`;
        tokensEl.appendChild(pill);
      }
    });
  } else if (result.type === 'fuzzy') {
    html = `<div class="translation-block">
      <div class="trans-en" style="opacity:0.6;font-size:0.85rem">Did you mean…?</div>`;
    result.data.forEach(w => {
      html += `
        <div style="margin-bottom:14px">
          <div class="trans-en">${w.en}</div>
          <div class="trans-ja">${w.ja}</div>
          <div class="trans-romaji">📢 ${w.romaji}</div>
          <div class="trans-meaning">${w.category}</div>
        </div>
        <hr class="trans-separator">`;
    });
    html += `</div>`;
  }

  area.innerHTML = html;

  // Grammar note
  const gNote = getGrammarNote(originalInput);
  if (gNote && !noteEl.innerHTML) {
    noteEl.innerHTML = `<strong>📖 ${gNote.name}:</strong> ${gNote.description}`;
  }

  details.style.display = (tokensEl.children.length > 0 || noteEl.innerHTML) ? 'block' : 'none';
}

// ============================================================
// 6. POPULATE UI
// ============================================================

function populateExamples() {
  const grid = document.getElementById('examplesGrid');
  const subset = PHRASES.slice(0, 12);
  grid.innerHTML = subset.map(p => `
    <div class="example-card" data-phrase="${p.en}">
      <div class="ex-en">${p.en}</div>
      <div class="ex-ja">${p.ja}</div>
      <div class="ex-romaji">📢 ${p.romaji}</div>
      ${p.note ? `<div class="ex-meaning">${p.note}</div>` : ''}
      <span class="ex-use-btn">Use in translator →</span>
    </div>
  `).join('');

  grid.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('click', () => {
      const phrase = card.dataset.phrase;
      document.getElementById('inputText').value = phrase;
      updateCharCount();
      triggerTranslation();
      switchTab('translate');
    });
  });
}

function populateVocab(filter = null, category = 'All') {
  const grid = document.getElementById('vocabGrid');
  let items = VOCAB;
  if (category !== 'All') items = items.filter(v => v.category === category);
  if (filter) {
    const f = filter.toLowerCase();
    items = items.filter(v => v.en.toLowerCase().includes(f) || v.ja.includes(f) || v.romaji.toLowerCase().includes(f));
  }
  grid.innerHTML = items.map(v => `
    <div class="vocab-card" data-en="${v.en}">
      <div class="vc-category">${v.category}</div>
      <div class="vc-en">${v.en}</div>
      <div class="vc-ja">${v.ja}</div>
      <div class="vc-romaji">📢 ${v.romaji}</div>
    </div>
  `).join('') || `<div style="color:var(--clr-text-muted);padding:20px">No results found.</div>`;

  grid.querySelectorAll('.vocab-card').forEach(card => {
    card.addEventListener('click', () => {
      document.getElementById('inputText').value = card.dataset.en;
      updateCharCount();
      triggerTranslation();
      switchTab('translate');
    });
  });
}

function populateCategories() {
  const cats = ['All', ...new Set(VOCAB.map(v => v.category))];
  const container = document.getElementById('categoryFilters');
  container.innerHTML = cats.map((c, i) => `
    <button class="cat-btn${i === 0 ? ' active' : ''}" data-cat="${c}">${c}</button>
  `).join('');

  container.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      populateVocab(currentSearch, currentCategory);
    });
  });
}

function populateGrammar() {
  const list = document.getElementById('grammarList');
  list.innerHTML = GRAMMAR.map((g, idx) => `
    <div class="grammar-item" id="gi-${idx}">
      <div class="grammar-item-header" data-idx="${idx}">
        <span class="grammar-lesson-badge">${g.lesson}</span>
        <span class="grammar-pattern-name">${g.name}</span>
        <span class="grammar-toggle">▼</span>
      </div>
      <div class="grammar-item-body">
        <div class="grammar-structure">${g.structure}</div>
        <div class="grammar-desc">${g.description}</div>
        <div class="grammar-examples">
          ${g.examples.map(e => `
            <div class="grammar-ex">
              <div class="ge-ja">${e.ja}</div>
              <div class="ge-rom">📢 ${e.romaji}</div>
              <div class="ge-en">${e.en}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.grammar-item-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = document.getElementById(`gi-${header.dataset.idx}`);
      item.classList.toggle('open');
    });
  });
}

// ============================================================
// 7. QUIZ ENGINE
// ============================================================

let quizState = { total: 10, current: 0, score: 0, questions: [], answered: false };

function startQuiz(count) {
  const shuffled = [...VOCAB].sort(() => Math.random() - 0.5);
  quizState = {
    total: Math.min(count, shuffled.length),
    current: 0,
    score: 0,
    questions: shuffled.slice(0, count),
    answered: false
  };
  document.getElementById('quizStart').style.display = 'none';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizQuestion').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  if (quizState.current >= quizState.total) {
    showResult();
    return;
  }
  const q = quizState.questions[quizState.current];
  const pct = (quizState.current / quizState.total) * 100;
  document.getElementById('quizFill').style.width = pct + '%';
  document.getElementById('quizProgress').textContent = `${quizState.current + 1} / ${quizState.total}`;
  document.getElementById('quizScore').textContent = quizState.score;
  document.getElementById('quizPrompt').innerHTML = `
    <div>What is the Japanese for:</div>
    <div style="font-size:1.6rem;font-weight:700;color:var(--clr-kana);margin-top:8px">"${q.en}"</div>
    <div class="prompt-sub">Choose the correct kana</div>`;
  document.getElementById('quizFeedback').innerHTML = '';
  quizState.answered = false;

  // Build 4 choices
  const wrong = VOCAB.filter(v => v.ja !== q.ja).sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [...wrong, q].sort(() => Math.random() - 0.5);

  document.getElementById('quizChoices').innerHTML = choices.map(c => `
    <button class="quiz-choice" data-ja="${c.ja}" data-correct="${c.ja === q.ja}">
      <span class="choice-ja">${c.ja}</span>
      <span class="choice-rom">${c.romaji}</span>
    </button>
  `).join('');

  document.querySelectorAll('.quiz-choice').forEach(btn => {
    btn.addEventListener('click', () => handleQuizAnswer(btn, q));
  });
}

function handleQuizAnswer(btn, q) {
  if (quizState.answered) return;
  quizState.answered = true;
  const isCorrect = btn.dataset.correct === 'true';
  const feedback = document.getElementById('quizFeedback');

  document.querySelectorAll('.quiz-choice').forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === 'true') b.classList.add('correct');
    else if (b === btn && !isCorrect) b.classList.add('wrong');
  });

  if (isCorrect) {
    quizState.score++;
    feedback.innerHTML = `<span style="color:var(--clr-success)">✅ Correct! ${q.romaji}</span>`;
  } else {
    feedback.innerHTML = `<span style="color:var(--clr-error)">❌ The answer is: ${q.ja} (${q.romaji})</span>`;
  }

  quizState.current++;
  setTimeout(showQuestion, 1800);
}

function showResult() {
  document.getElementById('quizQuestion').style.display = 'none';
  document.getElementById('quizResult').style.display = 'block';
  const pct = Math.round((quizState.score / quizState.total) * 100);
  let emoji = '😕', title = 'Keep Practicing!', msg = 'Review the vocabulary and try again.';
  if (pct >= 90) { emoji = '🏆'; title = '素晴らしい! Excellent!'; msg = 'You are a Japanese master!'; }
  else if (pct >= 70) { emoji = '🎉'; title = 'よくできました! Good Job!'; msg = 'You\'re getting great at Japanese!'; }
  else if (pct >= 50) { emoji = '👍'; title = 'がんばって! Keep Going!'; msg = 'You\'re making good progress!'; }
  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultScoreBig').textContent = `${quizState.score} / ${quizState.total} (${pct}%)`;
  document.getElementById('resultMsg').textContent = msg;
}

// ============================================================
// 8. FALLING KANA ANIMATION
// ============================================================
function createFallingKana() {
  const container = document.getElementById('fallingKana');
  const kanaChars = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
  for (let i = 0; i < 20; i++) {
    const span = document.createElement('span');
    span.style.cssText = `
      position: absolute;
      font-family: 'Noto Sans JP', sans-serif;
      font-size: ${12 + Math.random() * 20}px;
      color: rgba(188, 0, 45, ${0.05 + Math.random() * 0.1});
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: fall ${8 + Math.random() * 12}s linear ${Math.random() * 10}s infinite;
      pointer-events: none;
      user-select: none;
    `;
    span.textContent = kanaChars[Math.floor(Math.random() * kanaChars.length)];
    container.appendChild(span);
  }

  // Add fall keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fall {
      0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ============================================================
// 9. TTS (Text-to-Speech)
// ============================================================
function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ja-JP';
  utter.rate = 0.85;
  window.speechSynthesis.speak(utter);
}

// ============================================================
// 10. TOAST
// ============================================================
function showToast(msg, duration = 2500) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ============================================================
// 11. TAB SWITCHING
// ============================================================
function switchTab(tabName) {
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tabName}`).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// ============================================================
// 12. MAIN TRANSLATE TRIGGER
// ============================================================
let currentSearch = '';
let currentCategory = 'All';
let translateTimeout = null;

function updateCharCount() {
  const val = document.getElementById('inputText').value;
  document.getElementById('charCount').textContent = `${val.length} / 500`;
}

function triggerTranslation() {
  const input = document.getElementById('inputText').value.trim();
  if (!input) {
    document.getElementById('outputArea').innerHTML = `
      <div class="output-placeholder">
        <div class="placeholder-kana">に ほ ん ご</div>
        <div class="placeholder-text">Your Japanese translation will appear here</div>
      </div>`;
    document.getElementById('resultDetails').style.display = 'none';
    return;
  }

  // Show loading briefly for UX
  document.getElementById('loadingOverlay').style.display = 'flex';
  const kanaList = 'にほんごをまなぼう';
  let ki = 0;
  const kInterval = setInterval(() => {
    document.getElementById('spinnerKana').textContent = kanaList[ki++ % kanaList.length];
  }, 200);

  setTimeout(() => {
    clearInterval(kInterval);
    document.getElementById('loadingOverlay').style.display = 'none';
    const result = translateText(input);
    renderOutput(result, input);
  }, 400);
}

// ============================================================
// 13. INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // Populate sections
  populateExamples();
  populateCategories();
  populateVocab();
  populateGrammar();
  createFallingKana();

  // Tab navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Translate on input (debounced)
  document.getElementById('inputText').addEventListener('input', () => {
    updateCharCount();
    clearTimeout(translateTimeout);
    translateTimeout = setTimeout(triggerTranslation, 600);
  });

  // Translate button
  document.getElementById('translateBtn').addEventListener('click', triggerTranslation);

  // Enter key support
  document.getElementById('inputText').addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); triggerTranslation(); }
  });

  // Clear button
  document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('inputText').value = '';
    updateCharCount();
    triggerTranslation();
  });

  // Copy button
  document.getElementById('copyBtn').addEventListener('click', () => {
    const jaText = document.getElementById('outputArea').querySelector('.trans-ja');
    if (jaText) {
      navigator.clipboard.writeText(jaText.textContent).then(() => showToast('📋 Copied to clipboard!'));
    } else {
      showToast('Nothing to copy yet.');
    }
  });

  // Speak button
  document.getElementById('speakBtn').addEventListener('click', () => {
    const jaText = document.getElementById('outputArea').querySelector('.trans-ja');
    if (jaText) {
      speak(jaText.textContent);
      showToast('🔊 Speaking…');
    } else {
      showToast('Nothing to speak yet.');
    }
  });

  // Quick word buttons
  document.querySelectorAll('.qw-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('inputText').value = btn.dataset.word;
      updateCharCount();
      triggerTranslation();
    });
  });

  // Vocab search
  document.getElementById('vocabSearch').addEventListener('input', e => {
    currentSearch = e.target.value;
    populateVocab(currentSearch, currentCategory);
  });

  // Quiz buttons
  document.querySelectorAll('.quiz-start-btn').forEach(btn => {
    btn.addEventListener('click', () => startQuiz(parseInt(btn.dataset.count)));
  });
  document.getElementById('quizRestartBtn').addEventListener('click', () => {
    document.getElementById('quizStart').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
  });

  // Open first grammar item
  document.getElementById('gi-0')?.classList.add('open');
});
