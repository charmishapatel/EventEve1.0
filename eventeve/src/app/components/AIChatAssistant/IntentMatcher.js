export default function matchIntent(message) {
    const text = message.toLowerCase();
  
    // 🔹 Basic Navigation
    if (text.includes("book")) return { reply: "📅 Booking? Great choice!", path: "/User/Booking" };
    if (text.includes("cart")) return { reply: "🛒 Here’s what’s in your cart...", path: "/User/Cart" };
  
    // 🔐 Login or profile
    if (
      text.includes("login") ||
      text.includes("log in") ||
      text.includes("sign in") ||
      text.includes("account") ||
      text.includes("profile")
    ) {
      return { reply: "🔐 Redirecting to your profile...", path: "/User/Profile" };
    }
  
    if (text.includes("service")) {
      return { reply: "📋 Here are our available services...", path: "/User/Services" };
    }
  
    // ✅ Better Category-level Matching
    const categoryKeywords = {
      catering: "/User/ServiceDetails/catering",
      decoration: "/User/ServiceDetails/decoration",
      furniture: "/User/ServiceDetails/furniture",
      flower: "/User/ServiceDetails/flower",
      cake: "/User/ServiceDetails/cake",
      karaoke: "/User/ServiceDetails/karaoke",
      music: "/User/ServiceDetails/karaoke", 
    };
  
    for (const keyword in categoryKeywords) {
      const regex = new RegExp(`\\b${keyword}\\b.*(service|section)?`, "i"); // matches "cake service", "flower section"
      if (regex.test(text)) {
        return {
          reply: `✨ Taking you to our ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} services.`,
          path: categoryKeywords[keyword],
        };
      }
    }
  
    // 🎯 Specific item match
    const serviceMap = [
      {
        category: "Catering",
        phrases: ["dessert bar", "vegetarian meals", "buffet package", "gourmet platter"],
        path: "/User/ServiceDetails/catering",
      },
      {
        category: "Decoration",
        phrases: ["themed backdrops", "balloon decorations", "floral archway", "stage decorations"],
        path: "/User/ServiceDetails/decoration",
      },
      {
        category: "Furniture",
        phrases: ["round tables", "banquet chairs", "luxury sofa", "wedding thrones"],
        path: "/User/ServiceDetails/furniture",
      },
      {
        category: "Flower",
        phrases: ["rose bouquet", "orchid arrangement", "mixed floral basket", "table centerpieces"],
        path: "/User/ServiceDetails/flower",
      },
      {
        category: "Cake",
        phrases: ["themed cake", "wedding cake", "birthday cake"],
        path: "/User/ServiceDetails/cake",
      },
      {
        category: "Karaoke",
        phrases: ["acoustic band", "jazz band", "rock band", "live dj"],
        path: "/User/ServiceDetails/karaoke",
      },
    ];
  
    for (const service of serviceMap) {
      for (const phrase of service.phrases) {
        if (text.includes(phrase)) {
          return {
            reply: `🎯 Redirecting you to book "${phrase}" under ${service.category}.`,
            path: service.path,
          };
        }
      }
    }
  
    // ❌ No match — fallback to OpenAI
    return {
      reply: null,
      path: null,
    };
  }
  