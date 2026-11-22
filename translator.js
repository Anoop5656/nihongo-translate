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
<<<<<<< HEAD
// 2. SENTENCE / PHRASE DATABASE  (120+ daily-life sentences)
// ============================================================
const PHRASES = [

  // ---- INTRODUCTIONS & GREETINGS ----
  { en: 'Nice to meet you.', ja: 'はじめまして。どうぞ よろしく おねがいします。', romaji: 'Hajimemashite. Douzo yoroshiku onegai shimasu.', note: 'Standard first-time greeting. はじめまして = How do you do', category: 'Introductions' },
  { en: 'I am fine.', ja: 'げんきです。', romaji: 'Genki desu.', note: 'Common response to "how are you?"', category: 'Introductions' },
  { en: 'How are you?', ja: 'おげんきですか。', romaji: 'Ogenki desu ka.', note: 'Polite way to ask about someone\'s wellbeing', category: 'Introductions' },
  { en: 'I am a student.', ja: 'わたしは がくせい です。', romaji: 'Watashi wa gakusei desu.', note: 'は (wa) = topic marker, です (desu) = polite "is/am/are"', category: 'Introductions' },
  { en: 'I am not a teacher.', ja: 'わたしは せんせい では ありません。', romaji: 'Watashi wa sensei de wa arimasen.', note: 'Negative of です → では ありません', category: 'Introductions' },
  { en: 'What is your name?', ja: 'おなまえは なんですか。', romaji: 'Onamae wa nan desu ka.', note: 'おなまえ = polite form of name', category: 'Introductions' },
  { en: 'My name is Tanaka.', ja: 'わたしの なまえは たなかです。', romaji: 'Watashi no namae wa Tanaka desu.', note: 'の (no) = possessive marker', category: 'Introductions' },
  { en: 'Where are you from?', ja: 'どちらから いらっしゃいましたか。', romaji: 'Dochira kara irasshaimashita ka.', note: 'Very polite form; casual: どこから きましたか', category: 'Introductions' },
  { en: 'I am from India.', ja: 'わたしは インドから きました。', romaji: 'Watashi wa Indo kara kimashita.', note: 'から (kara) = from', category: 'Introductions' },
  { en: 'I am 25 years old.', ja: 'わたしは にじゅうごさい です。', romaji: 'Watashi wa nijuugo sai desu.', note: 'さい (sai) = years old', category: 'Introductions' },
  { en: 'How old are you?', ja: 'おいくつですか。', romaji: 'Oikutsu desu ka.', note: 'Polite way to ask age', category: 'Introductions' },
  { en: 'I work at a company.', ja: 'わたしは かいしゃで はたらいています。', romaji: 'Watashi wa kaisha de hataraite imasu.', note: 'で (de) = at (location of action)', category: 'Introductions' },
  { en: 'I live in Tokyo.', ja: 'わたしは とうきょうに すんでいます。', romaji: 'Watashi wa Toukyou ni sunde imasu.', note: 'すんでいます = am living (ongoing state)', category: 'Introductions' },

  // ---- SHOPPING ----
  { en: 'How much is this?', ja: 'これは いくら ですか。', romaji: 'Kore wa ikura desu ka.', note: 'いくら (ikura) = how much (price)', category: 'Shopping' },
  { en: 'Do you have a bigger one?', ja: 'もっと おおきい サイズは ありますか。', romaji: 'Motto ookii saizu wa arimasu ka.', note: 'もっと = more; ありますか = do you have?', category: 'Shopping' },
  { en: 'Do you have a smaller one?', ja: 'もっと ちいさい サイズは ありますか。', romaji: 'Motto chiisai saizu wa arimasu ka.', note: 'ちいさい (chiisai) = small', category: 'Shopping' },
  { en: 'I will take this one.', ja: 'これを ください。', romaji: 'Kore wo kudasai.', note: 'ください = please give me', category: 'Shopping' },
  { en: 'That is too expensive.', ja: 'それは たかすぎます。', romaji: 'Sore wa taka sugimasu.', note: 'すぎます = too much / excessive', category: 'Shopping' },
  { en: 'Is there a discount?', ja: 'わりびきは ありますか。', romaji: 'Waribiki wa arimasu ka.', note: 'わりびき = discount', category: 'Shopping' },
  { en: 'Can I pay by credit card?', ja: 'クレジットカードで はらえますか。', romaji: 'Kurejitto kaado de haraemasu ka.', note: 'はらえますか = can I pay (potential form)', category: 'Shopping' },
  { en: 'I am just looking.', ja: 'みているだけです。', romaji: 'Mite iru dake desu.', note: 'だけ (dake) = only / just', category: 'Shopping' },
  { en: 'Do you have this in blue?', ja: 'これの あおは ありますか。', romaji: 'Kore no ao wa arimasu ka.', note: 'の = possessive; color as noun', category: 'Shopping' },
  { en: 'Please give me a bag.', ja: 'ふくろを ください。', romaji: 'Fukuro wo kudasai.', note: 'ふくろ = bag/sack', category: 'Shopping' },
  { en: 'Where is the cashier?', ja: 'レジは どこ ですか。', romaji: 'Reji wa doko desu ka.', note: 'レジ = cash register/cashier (from "register")', category: 'Shopping' },
  { en: 'I want to return this.', ja: 'これを へんぴんしたいです。', romaji: 'Kore wo henpin shitai desu.', note: 'へんぴん = return of goods; たい = want to', category: 'Shopping' },
  { en: 'Do you have a receipt?', ja: 'レシートを もらえますか。', romaji: 'Reshiito wo moraemasu ka.', note: 'もらえますか = can I receive? (potential form)', category: 'Shopping' },

  // ---- RESTAURANT / FOOD ----
  { en: 'A table for two please.', ja: 'ふたりです。', romaji: 'Futari desu.', note: 'ふたり = two people; short natural answer to "how many?"', category: 'Restaurant' },
  { en: 'May I see the menu?', ja: 'メニューを みせて ください。', romaji: 'Menyuu wo misete kudasai.', note: 'みせてください = please show me (te-form request)', category: 'Restaurant' },
  { en: 'What do you recommend?', ja: 'おすすめは なんですか。', romaji: 'Osusume wa nan desu ka.', note: 'おすすめ = recommendation', category: 'Restaurant' },
  { en: 'I will have this.', ja: 'これに します。', romaji: 'Kore ni shimasu.', note: 'にします = I will decide on / I will have', category: 'Restaurant' },
  { en: 'One ramen please.', ja: 'ラーメンを ひとつ ください。', romaji: 'Raamen wo hitotsu kudasai.', note: 'ひとつ (hitotsu) = one (generic counter)', category: 'Restaurant' },
  { en: 'I am allergic to shrimp.', ja: 'えびアレルギーが あります。', romaji: 'Ebi arerugii ga arimasu.', note: 'アレルギー = allergy; あります = I have', category: 'Restaurant' },
  { en: 'Is this spicy?', ja: 'これは からいですか。', romaji: 'Kore wa karai desu ka.', note: 'からい (karai) = spicy/hot (taste)', category: 'Restaurant' },
  { en: 'Not too spicy please.', ja: 'あまり からくしないで ください。', romaji: 'Amari karaku shinai de kudasai.', note: 'ないでください = please don\'t (negative request)', category: 'Restaurant' },
  { en: 'The food was delicious.', ja: 'りょうりが おいしかったです。', romaji: 'Ryouri ga oishikatta desu.', note: 'Past tense of い-adj: おいしい → おいしかった', category: 'Restaurant' },
  { en: 'May I have the bill please?', ja: 'おかいけいを おねがいします。', romaji: 'Okaikei wo onegai shimasu.', note: 'おかいけい = bill/check (polite)', category: 'Restaurant' },
  { en: 'We will pay separately.', ja: 'べつべつに はらいます。', romaji: 'Betsube tsu ni haraimasu.', note: 'べつべつ = separately; はらいます = pay', category: 'Restaurant' },
  { en: 'Could I have some water?', ja: 'おみずを もらえますか。', romaji: 'Omizu wo moraemasu ka.', note: 'おみず = water (polite prefix お)', category: 'Restaurant' },
  { en: 'I am hungry.', ja: 'おなかが すいています。', romaji: 'Onaka ga suite imasu.', note: 'おなかが すく = to become hungry (ている = state)', category: 'Restaurant' },
  { en: 'I am full.', ja: 'おなかが いっぱいです。', romaji: 'Onaka ga ippai desu.', note: 'いっぱい = full', category: 'Restaurant' },
  { en: 'That was a great meal.', ja: 'ごちそうさまでした。', romaji: 'Gochisousama deshita.', note: 'Said after finishing a meal to express gratitude', category: 'Restaurant' },
  { en: 'Let\'s eat.', ja: 'いただきます。', romaji: 'Itadakimasu.', note: 'Said before eating — expresses gratitude for the food', category: 'Restaurant' },

  // ---- TRANSPORT / DIRECTIONS ----
  { en: 'Where is the station?', ja: 'えきは どこ ですか。', romaji: 'Eki wa doko desu ka.', note: 'どこ (doko) = where', category: 'Transport' },
  { en: 'How do I get to the airport?', ja: 'くうこうへ どうやって いきますか。', romaji: 'Kuukou e douyatte ikimasu ka.', note: 'どうやって = how / by what means', category: 'Transport' },
  { en: 'Please take me to this address.', ja: 'このじゅうしょまで おねがいします。', romaji: 'Kono juusho made onegai shimasu.', note: 'まで (made) = up to / until', category: 'Transport' },
  { en: 'How long does it take?', ja: 'どのくらい かかりますか。', romaji: 'Dono kurai kakarimasu ka.', note: 'かかります = it takes (time/money)', category: 'Transport' },
  { en: 'Please turn right.', ja: 'みぎへ まがってください。', romaji: 'Migi e magatte kudasai.', note: 'みぎ = right; まがる = to turn', category: 'Transport' },
  { en: 'Please turn left.', ja: 'ひだりへ まがってください。', romaji: 'Hidari e magatte kudasai.', note: 'ひだり = left', category: 'Transport' },
  { en: 'Go straight ahead.', ja: 'まっすぐ いってください。', romaji: 'Massugu itte kudasai.', note: 'まっすぐ = straight; いってください = please go', category: 'Transport' },
  { en: 'One ticket to Kyoto please.', ja: 'きょうとまで いちまいください。', romaji: 'Kyouto made ichimai kudasai.', note: 'まい = flat-object counter for tickets', category: 'Transport' },
  { en: 'Which bus goes to the city centre?', ja: 'しちゅうしんへ いくバスは どれですか。', romaji: 'Shichuushin e iku basu wa dore desu ka.', note: 'どれ = which one (of many)', category: 'Transport' },
  { en: 'Is this seat taken?', ja: 'このせきは あいていますか。', romaji: 'Kono seki wa aite imasu ka.', note: 'あいています = is vacant/open (state)', category: 'Transport' },
  { en: 'I missed the train.', ja: 'でんしゃに のりおくれました。', romaji: 'Densha ni nori okuremashita.', note: 'のりおくれる = to miss a train/bus', category: 'Transport' },
  { en: 'The train is delayed.', ja: 'でんしゃが おくれています。', romaji: 'Densha ga okure te imasu.', note: 'おくれています = is running late (state)', category: 'Transport' },
  { en: 'Is this the right way to Shibuya?', ja: 'しぶやへ この みちで いいですか。', romaji: 'Shibuya e kono michi de ii desu ka.', note: 'いいですか = is this okay / is this correct?', category: 'Transport' },
  { en: 'Please stop here.', ja: 'ここで とめてください。', romaji: 'Koko de tomete kudasai.', note: 'とめてください = please stop', category: 'Transport' },

  // ---- HOTEL / ACCOMMODATION ----
  { en: 'I have a reservation.', ja: 'よやくを しています。', romaji: 'Yoyaku wo shite imasu.', note: 'よやく = reservation; しています = have made', category: 'Hotel' },
  { en: 'I would like to check in.', ja: 'チェックインを おねがいします。', romaji: 'Chekkuin wo onegai shimasu.', note: 'チェックイン = check in (loanword)', category: 'Hotel' },
  { en: 'I would like to check out.', ja: 'チェックアウトを おねがいします。', romaji: 'Chekkuauto wo onegai shimasu.', note: 'チェックアウト = check out (loanword)', category: 'Hotel' },
  { en: 'Do you have a room available?', ja: 'あきべやは ありますか。', romaji: 'Akibeya wa arimasu ka.', note: 'あきべや = vacant room', category: 'Hotel' },
  { en: 'Is breakfast included?', ja: 'ちょうしょくは ついていますか。', romaji: 'Choushoku wa tsuite imasu ka.', note: 'ついています = is included (state)', category: 'Hotel' },
  { en: 'The air conditioner is not working.', ja: 'エアコンが こわれています。', romaji: 'Eakon ga kowarete imasu.', note: 'こわれています = is broken (state)', category: 'Hotel' },
  { en: 'Could I have another towel?', ja: 'タオルを もう いちまい もらえますか。', romaji: 'Taoru wo mou ichimai moraemasu ka.', note: 'もう = more/another; いちまい = one flat item', category: 'Hotel' },
  { en: 'What time is checkout?', ja: 'チェックアウトは なんじですか。', romaji: 'Chekkuauto wa nanji desu ka.', note: 'なんじ (nanji) = what time', category: 'Hotel' },

  // ---- HEALTH / DOCTOR ----
  { en: 'I have a stomachache.', ja: 'おなかが いたいです。', romaji: 'Onaka ga itai desu.', note: 'いたい (itai) = painful/hurts', category: 'Health' },
  { en: 'My head hurts.', ja: 'あたまが いたいです。', romaji: 'Atama ga itai desu.', note: 'あたま = head; いたい = hurts', category: 'Health' },
  { en: 'I have a fever.', ja: 'ねつが あります。', romaji: 'Netsu ga arimasu.', note: 'ねつ = fever; あります = I have', category: 'Health' },
  { en: 'I have a cold.', ja: 'かぜを ひいています。', romaji: 'Kaze wo hiite imasu.', note: 'かぜをひく = to catch a cold; ています = current state', category: 'Health' },
  { en: 'I feel dizzy.', ja: 'めまいが します。', romaji: 'Memai ga shimasu.', note: 'めまいがする = to feel dizzy', category: 'Health' },
  { en: 'Please call an ambulance.', ja: 'きゅうきゅうしゃを よんでください。', romaji: 'Kyuukyuusha wo yonde kudasai.', note: 'きゅうきゅうしゃ = ambulance; よんで = call', category: 'Health' },
  { en: 'I need medicine.', ja: 'くすりが ひつようです。', romaji: 'Kusuri ga hitsuyou desu.', note: 'ひつようです = is necessary/needed', category: 'Health' },
  { en: 'I am allergic to penicillin.', ja: 'ペニシリンアレルギーが あります。', romaji: 'Penishirin arerugii ga arimasu.', note: 'アレルギー = allergy', category: 'Health' },
  { en: 'Where does it hurt?', ja: 'どこが いたいですか。', romaji: 'Doko ga itai desu ka.', note: 'どこ = where; いたい = hurts', category: 'Health' },
  { en: 'I cannot sleep well.', ja: 'よく ねむれません。', romaji: 'Yoku nemuremase n.', note: 'ねむれません = cannot sleep (potential negative)', category: 'Health' },

  // ---- WORK / SCHOOL ----
  { en: 'I go to school every day.', ja: 'まいにち がっこうへ いきます。', romaji: 'Mainichi gakkou e ikimasu.', note: 'まいにち = every day', category: 'Work & School' },
  { en: 'I study Japanese.', ja: 'にほんごを べんきょうしています。', romaji: 'Nihongo wo benkyou shite imasu.', note: 'ています = ongoing action', category: 'Work & School' },
  { en: 'I have a meeting at three.', ja: 'さんじに かいぎが あります。', romaji: 'Sanji ni kaigi ga arimasu.', note: 'に (ni) = at (specific time)', category: 'Work & School' },
  { en: 'I will be late today.', ja: 'きょうは おそくなります。', romaji: 'Kyou wa osoku narimasu.', note: 'おそく + なります = will become late', category: 'Work & School' },
  { en: 'I am busy now.', ja: 'いまは いそがしいです。', romaji: 'Ima wa isogashii desu.', note: 'いそがしい = busy (い-adjective)', category: 'Work & School' },
  { en: 'I finished work.', ja: 'しごとが おわりました。', romaji: 'Shigoto ga owarimashita.', note: 'おわりました = finished (past tense)', category: 'Work & School' },
  { en: 'I have homework.', ja: 'しゅくだいが あります。', romaji: 'Shukudai ga arimasu.', note: 'しゅくだい = homework', category: 'Work & School' },
  { en: 'May I take tomorrow off?', ja: 'あしたは やすんでも いいですか。', romaji: 'Ashita wa yasunde mo ii desu ka.', note: 'てもいいですか = may I / is it okay to?', category: 'Work & School' },
  { en: 'The exam was difficult.', ja: 'しけんは むずかしかったです。', romaji: 'Shiken wa muzukashikatta desu.', note: 'Past form of い-adj むずかしい → むずかしかった', category: 'Work & School' },
  { en: 'Please teach me.', ja: 'おしえてください。', romaji: 'Oshiete kudasai.', note: 'おしえてください = please teach/tell me', category: 'Work & School' },

  // ---- TELEPHONE / MESSAGING ----
  { en: 'Hello? (on the phone)', ja: 'もしもし。', romaji: 'Moshi moshi.', note: 'Standard Japanese phone greeting — not used in person', category: 'Telephone' },
  { en: 'Is Mr Tanaka there?', ja: 'たなかさんは いらっしゃいますか。', romaji: 'Tanaka san wa irasshaimasu ka.', note: 'いらっしゃいます = very polite form of います', category: 'Telephone' },
  { en: 'I will call back later.', ja: 'あとで かけなおします。', romaji: 'Ato de kakenao shimasu.', note: 'かけなおす = to call back', category: 'Telephone' },
  { en: 'Could you speak more slowly?', ja: 'もっと ゆっくり はなしてもらえますか。', romaji: 'Motto yukkuri hanashite moraemasu ka.', note: 'てもらえますか = could you please do ~ for me?', category: 'Telephone' },
  { en: 'I will send you a message.', ja: 'メッセージを おくります。', romaji: 'Messeiji wo okurimasu.', note: 'おくります = to send', category: 'Telephone' },
  { en: 'My phone number is...', ja: 'わたしの でんわばんごうは... です。', romaji: 'Watashi no denwabangou wa ... desu.', note: 'でんわばんごう = phone number', category: 'Telephone' },
  { en: 'I could not hear you.', ja: 'きこえませんでした。', romaji: 'Kikoe masen deshita.', note: 'きこえる = to be audible; past negative', category: 'Telephone' },

  // ---- WEATHER ----
  { en: 'Today is hot.', ja: 'きょうは あついです。', romaji: 'Kyou wa atsui desu.', note: 'あつい (atsui) = hot (temperature)', category: 'Weather' },
  { en: 'Today is cold.', ja: 'きょうは さむいです。', romaji: 'Kyou wa samui desu.', note: 'さむい (samui) = cold (weather)', category: 'Weather' },
  { en: 'It is raining.', ja: 'あめが ふっています。', romaji: 'Ame ga futte imasu.', note: 'ふっています = is falling (ongoing)', category: 'Weather' },
  { en: 'It is snowing.', ja: 'ゆきが ふっています。', romaji: 'Yuki ga futte imasu.', note: 'ゆき = snow; ふる = to fall (rain/snow)', category: 'Weather' },
  { en: 'The weather is nice today.', ja: 'きょうは いい てんきですね。', romaji: 'Kyou wa ii tenki desu ne.', note: 'ね = right? / isn\'t it? (seeking agreement)', category: 'Weather' },
  { en: 'Will it rain tomorrow?', ja: 'あしたは あめが ふりますか。', romaji: 'Ashita wa ame ga furimasu ka.', note: 'Plain polite question about future', category: 'Weather' },
  { en: 'I need an umbrella.', ja: 'かさが ひつようです。', romaji: 'Kasa ga hitsuyou desu.', note: 'かさ = umbrella; ひつようです = is necessary', category: 'Weather' },
  { en: 'It is very windy.', ja: 'かぜが とても つよいです。', romaji: 'Kaze ga totemo tsuyoi desu.', note: 'とても = very; つよい = strong', category: 'Weather' },

  // ---- DAILY ROUTINE ----
  { en: 'I wake up at seven.', ja: 'しちじに おきます。', romaji: 'Shichiji ni okimasu.', note: 'に (ni) = at (specific time); しちじ = 7 o\'clock', category: 'Daily Life' },
  { en: 'I eat breakfast every morning.', ja: 'まいあさ あさごはんを たべます。', romaji: 'Maiasa asagohan wo tabemasu.', note: 'まいあさ = every morning', category: 'Daily Life' },
  { en: 'I go to bed at eleven.', ja: 'じゅういちじに ねます。', romaji: 'Juuichiji ni nemasu.', note: 'じゅういちじ = 11 o\'clock; ねます = sleep/go to bed', category: 'Daily Life' },
  { en: 'I brush my teeth.', ja: 'はを みがきます。', romaji: 'Ha wo migakimasu.', note: 'は = teeth; みがく = to brush/polish', category: 'Daily Life' },
  { en: 'I take a bath.', ja: 'おふろに はいります。', romaji: 'Ofuro ni hairimasu.', note: 'おふろ = bath; はいります = to enter/take', category: 'Daily Life' },
  { en: 'I watch television in the evening.', ja: 'ばん テレビを みます。', romaji: 'Ban terebi wo mimasu.', note: 'ばん = evening; みます = to watch', category: 'Daily Life' },
  { en: 'I read a book before sleeping.', ja: 'ねるまえに ほんを よみます。', romaji: 'Neru mae ni hon wo yomimasu.', note: 'まえに (mae ni) = before', category: 'Daily Life' },
  { en: 'I exercise every day.', ja: 'まいにち うんどうします。', romaji: 'Mainichi undou shimasu.', note: 'うんどう = exercise; します = to do', category: 'Daily Life' },
  { en: 'I go shopping on weekends.', ja: 'しゅうまつに かいものを します。', romaji: 'Shuumatsu ni kaimono wo shimasu.', note: 'しゅうまつ = weekend', category: 'Daily Life' },
  { en: 'I cook dinner.', ja: 'ゆうしょくを りょうりします。', romaji: 'Yuushoku wo ryouri shimasu.', note: 'ゆうしょく = dinner; りょうりする = to cook', category: 'Daily Life' },

  // ---- FEELINGS & EMOTIONS ----
  { en: 'I am happy.', ja: 'うれしいです。', romaji: 'Ureshii desu.', note: 'うれしい = happy/glad (い-adjective)', category: 'Feelings' },
  { en: 'I am sad.', ja: 'かなしいです。', romaji: 'Kanashii desu.', note: 'かなしい = sad (い-adjective)', category: 'Feelings' },
  { en: 'I am tired.', ja: 'つかれました。', romaji: 'Tsukaremashita.', note: 'つかれる = to get tired; ました = past tense (resultant state)', category: 'Feelings' },
  { en: 'I am nervous.', ja: 'きんちょうしています。', romaji: 'Kinchou shite imasu.', note: 'きんちょう = nervousness; しています = is doing (state)', category: 'Feelings' },
  { en: 'I am excited.', ja: 'わくわくしています。', romaji: 'Wakuwaku shite imasu.', note: 'わくわく = onomatopoeia for excitement', category: 'Feelings' },
  { en: 'I am bored.', ja: 'たいくつです。', romaji: 'Taikutsu desu.', note: 'たいくつ = boredom/tedium (な-adjective)', category: 'Feelings' },
  { en: 'I am worried.', ja: 'しんぱいしています。', romaji: 'Shinpai shite imasu.', note: 'しんぱい = worry; しています = am doing (state)', category: 'Feelings' },
  { en: 'I am surprised.', ja: 'おどろきました。', romaji: 'Odorokimashita.', note: 'おどろく = to be surprised; past tense', category: 'Feelings' },

  // ---- INVITATIONS & PLANS ----
  { en: 'Let\'s eat together.', ja: 'いっしょに たべましょう。', romaji: 'Issho ni tabemashou.', note: 'ましょう = let\'s do (invitation)', category: 'Invitations' },
  { en: 'Would you like to have coffee?', ja: 'コーヒーを のみませんか。', romaji: 'Koohii wo nomimasen ka.', note: 'ませんか = negative question = polite invitation', category: 'Invitations' },
  { en: 'Are you free on Saturday?', ja: 'どようびは ひまですか。', romaji: 'Doyoubi wa hima desu ka.', note: 'ひま = free time / not busy', category: 'Invitations' },
  { en: 'Let\'s go to the cinema.', ja: 'えいがかんへ いきましょう。', romaji: 'Eigakan e ikimashou.', note: 'えいがかん = cinema/movie theatre', category: 'Invitations' },
  { en: 'What time shall we meet?', ja: 'なんじに あいましょうか。', romaji: 'Nanji ni aimashou ka.', note: 'ましょうか = shall we? (volitional question)', category: 'Invitations' },
  { en: 'I am sorry, I am busy that day.', ja: 'すみません、その日は いそがしいです。', romaji: 'Sumimasen, sono hi wa isogashii desu.', note: 'その日 = that day; いそがしい = busy', category: 'Invitations' },
  { en: 'That sounds good.', ja: 'いいですね。', romaji: 'Ii desu ne.', note: 'ね = right? Expresses agreement and mild excitement', category: 'Invitations' },

  // ---- SHOPPING / GENERAL ----
  { en: 'This is a book.', ja: 'これは ほん です。', romaji: 'Kore wa hon desu.', note: 'これ (kore) = this thing near the speaker', category: 'Basic Sentences' },
  { en: 'That is a pen.', ja: 'それは ペン です。', romaji: 'Sore wa pen desu.', note: 'それ (sore) = that thing near the listener', category: 'Basic Sentences' },
  { en: 'That over there is a bag.', ja: 'あれは かばん です。', romaji: 'Are wa kaban desu.', note: 'あれ (are) = that thing away from both', category: 'Basic Sentences' },
  { en: 'Where is the toilet?', ja: 'トイレは どこ ですか。', romaji: 'Toire wa doko desu ka.', note: 'どこ (doko) = where', category: 'Basic Sentences' },
  { en: 'Please give me water.', ja: 'みずを ください。', romaji: 'Mizu wo kudasai.', note: 'を (wo) marks the direct object; ください = please give', category: 'Basic Sentences' },
  { en: 'I go to school.', ja: 'わたしは がっこうへ いきます。', romaji: 'Watashi wa gakkou e ikimasu.', note: 'へ (e) marks direction of movement', category: 'Basic Sentences' },
  { en: 'I ate sushi.', ja: 'わたしは すしを たべました。', romaji: 'Watashi wa sushi wo tabemashita.', note: 'Past tense: たべます → たべました', category: 'Basic Sentences' },
  { en: 'I will drink coffee.', ja: 'わたしは コーヒーを のみます。', romaji: 'Watashi wa koohii wo nomimasu.', note: 'Present/future tense masu-form', category: 'Basic Sentences' },
  { en: 'Do you like sushi?', ja: 'すしが すきですか。', romaji: 'Sushi ga suki desu ka.', note: 'が (ga) marks the subject of a state/feeling verb', category: 'Basic Sentences' },
  { en: 'I like music.', ja: 'おんがくが すきです。', romaji: 'Ongaku ga suki desu.', note: 'すきです (suki desu) = like', category: 'Basic Sentences' },
  { en: 'Please wait a moment.', ja: 'ちょっと まってください。', romaji: 'Chotto matte kudasai.', note: 'てください = please do (te-form request)', category: 'Basic Sentences' },
  { en: 'May I take a photo?', ja: 'しゃしんを とっても いいですか。', romaji: 'Shashin wo totte mo ii desu ka.', note: 'てもいいですか = may I / is it okay to?', category: 'Basic Sentences' },
  { en: 'I cannot speak Japanese well.', ja: 'にほんごが あまり はなせません。', romaji: 'Nihongo ga amari hanasemasen.', note: 'Potential negative form; あまり = not very much', category: 'Basic Sentences' },
  { en: 'Is there a hospital near here?', ja: 'このちかくに びょういんが ありますか。', romaji: 'Kono chikaku ni byouin ga arimasu ka.', note: 'に (ni) marks location; あります = there is (inanimate)', category: 'Basic Sentences' },
  { en: 'I want to go to Japan.', ja: 'にほんへ いきたいです。', romaji: 'Nihon e ikitai desu.', note: 'たいです = want to do (desire form)', category: 'Basic Sentences' },
  { en: 'Are you a student?', ja: 'あなたは がくせい ですか。', romaji: 'Anata wa gakusei desu ka.', note: 'Question formed by adding か (ka) at the end', category: 'Basic Sentences' },
=======
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
>>>>>>> a06f6a7bc5a1632fee42f332d563f890b4a74226
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
<<<<<<< HEAD
        ${p.category ? `<div style="margin-top:8px"><span class="ex-cat-badge">📂 ${p.category}</span></div>` : ''}
=======
>>>>>>> a06f6a7bc5a1632fee42f332d563f890b4a74226
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

<<<<<<< HEAD
function populateExamples(filterCat = 'All') {
  const grid = document.getElementById('examplesGrid');
  const cats = ['All', ...new Set(PHRASES.map(p => p.category).filter(Boolean))];

  // Build category filter pills if not already there
  let filterBar = document.getElementById('exampleFilterBar');
  if (!filterBar) {
    filterBar = document.createElement('div');
    filterBar.id = 'exampleFilterBar';
    filterBar.className = 'category-filters';
    filterBar.style.marginBottom = '16px';
    grid.parentElement.insertBefore(filterBar, grid);
  }
  filterBar.innerHTML = cats.map(c => `
    <button class="cat-btn${c === filterCat ? ' active' : ''}" data-excat="${c}">${c}</button>
  `).join('');
  filterBar.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => populateExamples(btn.dataset.excat));
  });

  const subset = filterCat === 'All' ? PHRASES : PHRASES.filter(p => p.category === filterCat);
  grid.innerHTML = subset.map(p => `
    <div class="example-card" data-phrase="${p.en.replace(/"/g, '&quot;')}">
      ${p.category ? `<div class="ex-cat-badge">${p.category}</div>` : ''}
=======
function populateExamples() {
  const grid = document.getElementById('examplesGrid');
  const subset = PHRASES.slice(0, 12);
  grid.innerHTML = subset.map(p => `
    <div class="example-card" data-phrase="${p.en}">
>>>>>>> a06f6a7bc5a1632fee42f332d563f890b4a74226
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
  //createFallingKana();

  // Tab navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Translate on input (debounced)
  document.getElementById('inputText').addEventListener('input', () => {
    updateCharCount();
    document.getElementById('outputArea').innerHTML = `
      <div class="output-placeholder">
        <div class="placeholder-text">
          Click Translate to see your Japanese translation
        </div>
      </div>`;

  // Hide grammar and token details until translation is requested
    document.getElementById('resultDetails').style.display = 'none'; 
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
