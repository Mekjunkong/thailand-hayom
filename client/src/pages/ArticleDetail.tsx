import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Tag, Clock, ArrowLeft, Crown } from "lucide-react";
import { useEffect } from "react";

// Sample article data - will be replaced with database queries
const articlesData: Record<string, any> = {
  "best-vegan-restaurants-chiang-mai": {
    id: 1,
    slug: "best-vegan-restaurants-chiang-mai",
    titleHe: "10 המסעדות הטבעוניות הטובות ביותר בצ'אנג מאי",
    titleEn: "10 Best Vegan Restaurants in Chiang Mai",
    metaDescriptionHe: "מדריך מקיף למסעדות הטבעוניות הטובות ביותר בצ'אנג מאי 2026, כולל כתובות מדויקות, מחירים, תפריטים מומלצים וטיפים פנימיים",
    metaDescriptionEn: "Complete guide to the best vegan restaurants in Chiang Mai 2026, including exact addresses, prices, recommended menus and insider tips",
    category: "food",
    categoryHe: "אוכל",
    categoryEn: "Food",
    date: "2026-01-20",
    readTime: 8,
    isPremium: false,
    contentHe: `
# 10 המסעדות הטבעוניות הטובות ביותר בצ'אנג מאי

צ'אנג מאי היא גן עדן למטיילים טבעוניים! העיר מציעה מגוון עצום של מסעדות טבעוניות איכותיות, ממסעדות תאילנדיות מסורתיות ועד מטבחים בינלאומיים. הכנו עבורכם מדריך מקיף ל-10 המסעדות הטובות ביותר שחובה לבקר בהן.

## 1. Goodsouls Kitchen - המסעדה הטבעונית המובילה

**כתובת:** 14/2 Hussadhisawee Road, Chang Phueak  
**מחירים:** 80-150 באט למנה  
**שעות פתיחה:** 08:00-21:00 (סגור ימי שלישי)

Goodsouls Kitchen היא ללא ספק המסעדה הטבעונית הטובה ביותר בצ'אנג מאי. התפריט מציע מגוון עצום של מנות תאילנדיות ובינלאומיות, כולן טבעוניות 100% וללא גלוטן.

### מנות מומלצות:
- **Massaman Curry** - קארי עשיר ומתוק עם תפוחי אדמה וחמוצים (120 באט)
- **Tom Yum Soup** - מרק חמוץ-חריף עם פטריות ועשבי תיבול (100 באט)
- **Pad Thai** - הגרסה הטבעונית של המנה הלאומית (95 באט)

**טיפ פנימי:** הגיעו לארוחת בוקר ונסו את ה-Pancakes עם פירות טרופיים - מדהים!

## 2. Amrita Garden - אוכל אורגני ובריא

**כתובת:** 27 Soi 1, Ratchamanka Road, Phra Sing  
**מחירים:** 90-180 באט למנה  
**שעות פתיחה:** 09:00-22:00

מסעדה מקסימה עם גינה שקטה, המתמחה באוכל אורגני ובריא. כל הירקות מגיעים מחוות מקומיות, והתפריט משתנה בהתאם לעונה.

### מנות מומלצות:
- **Rainbow Buddha Bowl** - קערה צבעונית מלאה בירקות, קינואה וטופו (140 באט)
- **Green Curry** - קארי ירוק חריף עם ירקות עונתיים (130 באט)
- **Mango Sticky Rice** - קינוח קלאסי עם אורז דביק ומנגו (80 באט)

## 3. Pun Pun Vegetarian Restaurant - אוכל תאילנדי מסורתי

**כתובת:** 158/8 Wualai Road, Hai Ya  
**מחירים:** 50-100 באט למנה  
**שעות פתיחה:** 07:00-20:00

מסעדה משפחתית אותנטית עם אוכל תאילנדי מסורתי במחירים נוחים. האווירה פשוטה אבל האוכל מעולה!

### מנות מומלצות:
- **Khao Soi** - מרק אטריות קארי צהוב, המנה המפורסמת של צ'אנג מאי (60 באט)
- **Som Tam** - סלט פפאיה ירוקה חריף (50 באט)
- **Pad See Ew** - אטריות מוקפצות עם ירקות (55 באט)

## 4. Reform Kafé - קפה ובראנץ' טבעוני

**כתובת:** 89/1 Ratchamanka Road, Phra Sing  
**מחירים:** 100-200 באט למנה  
**שעות פתיחה:** 08:00-17:00

בית קפה מודרני עם אווירה נעימה, מושלם לארוחת בוקר או בראנץ'. מציעים גם קפה איכותי וקינוחים טבעוניים.

### מנות מומלצות:
- **Avocado Toast** - טוסט עם אבוקדו, עגבניות ומיקרוגרינס (145 באט)
- **Smoothie Bowl** - קערת סמוזי עם פירות טרופיים (135 באט)
- **Vegan Burger** - המבורגר טבעוני עם צ'יפס (180 באט)

## 5. Anchan Vegetarian Restaurant - מסעדה תאילנדית מקומית

**כתובת:** 88 Charoenrat Road, Wat Ket  
**מחירים:** 40-80 באט למנה  
**שעות פתיחה:** 08:00-19:00

מסעדה מקומית פשוטה עם אוכל טעים במחירים זולים במיוחד. פופולרית בקרב תושבי המקום.

### מנות מומלצות:
- **Fried Rice** - אורז מוקפץ עם ירקות וטופו (45 באט)
- **Spring Rolls** - רולי אביב טריים עם רוטב בוטנים (40 באט)
- **Tom Kha** - מרק קוקוס עם פטריות (50 באט)

## טיפים כלליים למטיילים טבעוניים בצ'אנג מאי

### מילים שימושיות בתאילנדית:
- **"เจ" (Jay)** - טבעוני (ללא מוצרים מן החי)
- **"มังสวิรัติ" (Mangsawirat)** - צמחוני
- **"ไม่เอาเนื้อสัตว์" (Mai ao nuea sat)** - ללא בשר

### איך למצוא מסעדות טבעוניות:
1. חפשו את הסימן הצהוב עם המילה "เจ" (Jay) - זה מעיד על מסעדה טבעונית
2. השתמשו באפליקציה HappyCow למציאת מסעדות טבעוניות
3. שאלו במלון או בהוסטל - רוב המקומות מכירים מסעדות טבעוניות באזור

### מה לשים לב אליו:
- ברוב המסעדות התאילנדיות משתמשים ברוטב דגים - ודאו שהמנה "Jay" (טבעונית)
- חלק מהמסעדות הצמחוניות משתמשות בביצים - שאלו אם המנה "Jay"
- בשווקים יש הרבה אוכל טבעוני - חפשו דוכנים עם הסימן הצהוב

## סיכום

צ'אנג מאי היא יעד מצוין למטיילים טבעוניים! המסעדות שהצגנו כאן מציעות מגוון רחב של אוכל איכותי במחירים סבירים. אל תפספסו את ההזדמנות לנסות את המטבח התאילנדי הטבעוני - זה חוויה קולינרית מדהימה!

**האם המאמר עזר לכם? שתפו אותו עם חברים שמתכננים טיול לתאילנד! 🌱**
    `,
    contentEn: `
# 10 Best Vegan Restaurants in Chiang Mai

Chiang Mai is a paradise for vegan travelers! The city offers a huge variety of quality vegan restaurants, from traditional Thai restaurants to international cuisines. We've prepared a comprehensive guide to the 10 best restaurants you must visit.

## 1. Goodsouls Kitchen - The Leading Vegan Restaurant

**Address:** 14/2 Hussadhisawee Road, Chang Phueak  
**Prices:** 80-150 baht per dish  
**Opening hours:** 08:00-21:00 (Closed Tuesdays)

Goodsouls Kitchen is undoubtedly the best vegan restaurant in Chiang Mai. The menu offers a huge variety of Thai and international dishes, all 100% vegan and gluten-free.

### Recommended dishes:
- **Massaman Curry** - Rich and sweet curry with potatoes and peanuts (120 baht)
- **Tom Yum Soup** - Sour-spicy soup with mushrooms and herbs (100 baht)
- **Pad Thai** - Vegan version of the national dish (95 baht)

**Insider tip:** Come for breakfast and try the Pancakes with tropical fruits - amazing!

## 2. Amrita Garden - Organic and Healthy Food

**Address:** 27 Soi 1, Ratchamanka Road, Phra Sing  
**Prices:** 90-180 baht per dish  
**Opening hours:** 09:00-22:00

Lovely restaurant with a quiet garden, specializing in organic and healthy food. All vegetables come from local farms, and the menu changes according to the season.

### Recommended dishes:
- **Rainbow Buddha Bowl** - Colorful bowl full of vegetables, quinoa and tofu (140 baht)
- **Green Curry** - Spicy green curry with seasonal vegetables (130 baht)
- **Mango Sticky Rice** - Classic dessert with sticky rice and mango (80 baht)

## 3. Pun Pun Vegetarian Restaurant - Traditional Thai Food

**Address:** 158/8 Wualai Road, Hai Ya  
**Prices:** 50-100 baht per dish  
**Opening hours:** 07:00-20:00

Authentic family restaurant with traditional Thai food at affordable prices. The atmosphere is simple but the food is excellent!

### Recommended dishes:
- **Khao Soi** - Yellow curry noodle soup, Chiang Mai's famous dish (60 baht)
- **Som Tam** - Spicy green papaya salad (50 baht)
- **Pad See Ew** - Stir-fried noodles with vegetables (55 baht)

## 4. Reform Kafé - Vegan Café and Brunch

**Address:** 89/1 Ratchamanka Road, Phra Sing  
**Prices:** 100-200 baht per dish  
**Opening hours:** 08:00-17:00

Modern café with a pleasant atmosphere, perfect for breakfast or brunch. They also offer quality coffee and vegan desserts.

### Recommended dishes:
- **Avocado Toast** - Toast with avocado, tomatoes and microgreens (145 baht)
- **Smoothie Bowl** - Smoothie bowl with tropical fruits (135 baht)
- **Vegan Burger** - Vegan burger with chips (180 baht)

## 5. Anchan Vegetarian Restaurant - Local Thai Restaurant

**Address:** 88 Charoenrat Road, Wat Ket  
**Prices:** 40-80 baht per dish  
**Opening hours:** 08:00-19:00

Simple local restaurant with delicious food at very cheap prices. Popular among locals.

### Recommended dishes:
- **Fried Rice** - Fried rice with vegetables and tofu (45 baht)
- **Spring Rolls** - Fresh spring rolls with peanut sauce (40 baht)
- **Tom Kha** - Coconut soup with mushrooms (50 baht)

## General Tips for Vegan Travelers in Chiang Mai

### Useful Thai words:
- **"เจ" (Jay)** - Vegan (without animal products)
- **"มังสวิรัติ" (Mangsawirat)** - Vegetarian
- **"ไม่เอาเนื้อสัตว์" (Mai ao nuea sat)** - Without meat

### How to find vegan restaurants:
1. Look for the yellow sign with the word "เจ" (Jay) - this indicates a vegan restaurant
2. Use the HappyCow app to find vegan restaurants
3. Ask at your hotel or hostel - most places know vegan restaurants in the area

### What to pay attention to:
- Most Thai restaurants use fish sauce - make sure the dish is "Jay" (vegan)
- Some vegetarian restaurants use eggs - ask if the dish is "Jay"
- In markets there is a lot of vegan food - look for stalls with the yellow sign

## Summary

Chiang Mai is an excellent destination for vegan travelers! The restaurants we've presented here offer a wide variety of quality food at reasonable prices. Don't miss the opportunity to try Thai vegan cuisine - it's an amazing culinary experience!

**Did this article help you? Share it with friends planning a trip to Thailand! 🌱**
    `
  },
};

export default function ArticleDetail() {
  const [, params] = useRoute("/articles/:slug");
  const { language, t } = useLanguage();
  const slug = params?.slug || "";
  const article = articlesData[slug];

  // Set page title and meta description for SEO
  useEffect(() => {
    if (article) {
      document.title = `${language === 'he' ? article.titleHe : article.titleEn} | Thailand Hayom`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', language === 'he' ? article.metaDescriptionHe : article.metaDescriptionEn);
      }
    }
  }, [article, language]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {t({ he: "המאמר לא נמצא", en: "Article Not Found" })}
          </h1>
          <Link href="/articles">
            <Button>
              {t({ he: "חזרה למאמרים", en: "Back to Articles" })}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const content = language === 'he' ? article.contentHe : article.contentEn;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/articles">
          <Button variant="ghost" className="mb-8 hover:bg-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t({ he: "חזרה למאמרים", en: "Back to Articles" })}
          </Button>
        </Link>

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-blue-500" />
          <span className="text-lg font-semibold text-blue-600">
            {language === 'he' ? article.categoryHe : article.categoryEn}
          </span>
          {article.isPremium && (
            <div className="ml-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Crown className="w-4 h-4" />
              {t({ he: "פרימיום", en: "Premium" })}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
          {language === 'he' ? article.titleHe : article.titleEn}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{new Date(article.date).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{article.readTime} {t({ he: "דקות קריאה", en: "min read" })}</span>
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:pb-2
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-ul:my-6 prose-li:my-2
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />').replace(/^# (.*$)/gim, '<h1>$1</h1>').replace(/^## (.*$)/gim, '<h2>$1</h2>').replace(/^### (.*$)/gim, '<h3>$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
        />
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            {t({ he: "מאמרים נוספים שיעניינו אותך", en: "More Articles You Might Like" })}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Placeholder for related articles */}
            <Link href="/articles">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <h3 className="font-bold text-xl mb-2 text-gray-900">
                  {t({ he: "צפה בכל המאמרים", en: "View All Articles" })}
                </h3>
                <p className="text-gray-600">
                  {t({ he: "עוד מאות מאמרים ומדריכים מחכים לך", en: "Hundreds more articles and guides await you" })}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t({ he: "אהבת את המאמר?", en: "Enjoyed This Article?" })}
            </h2>
            <p className="text-xl mb-10 opacity-90">
              {t({ 
                he: "הצטרף לניוזלטר שלנו וקבל מאמרים חדשים ישירות למייל",
                en: "Join our newsletter and get new articles directly to your inbox"
              })}
            </p>
            <Link href="/#newsletter">
              <Button size="lg" className="px-12 py-7 text-xl bg-white text-blue-600 hover:bg-gray-50 font-bold rounded-xl shadow-2xl">
                {t({ he: "הצטרף לניוזלטר", en: "Join Newsletter" })}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
