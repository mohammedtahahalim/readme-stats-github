import getData from "../helper/getData";
import template from "../helper/template";
import { ALLOWED_LANGS, TLang } from "../langs/allowedLangs";

export type UiConfig = {
  text_color: string;
  icon_color: string;
  border_color: string;
  card_color: string;
  lang: TLang;
};

export default async function readmeStats(req: any, res: any): Promise<any> {
  try {
    let username = req.query.username;

    let uiConfig: UiConfig = {
      text_color: req.query.tc || "000",
      icon_color: req.query.ic || "FF0000",
      border_color: req.query.bc || "7e7979",
      card_color: req.query.cc || "fff",
      lang: ALLOWED_LANGS.includes(req.query.lang) ? req.query.lang : "en",
    };

    if (!username) throw new Error("Username is required");

    var fetchStats = await getData(username, uiConfig.lang);
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate");

    if (req.query.format === "json") {
      res.json(fetchStats);
    } else {
      res.setHeader("Content-Type", "image/svg+xml");
      let svg = template(fetchStats, uiConfig);
      res.send(svg);
    }
  } catch (error: any) {
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(500).send(error.message);
  }
}
