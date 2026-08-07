import millify from "millify";
import basicFetch from "./basicFetch";
import repositoryFetch from "./repositoryFetch";
import { TLang } from "../langs/allowedLangs";
import { convertNumber } from "./convertNumber";
const base64ImageFetcher = require("node-base64-image");

export type GetData = {
  username: string;
  name: string;
  pic: string | Buffer;
  public_repos: string | number;
  followers: string | number;
  following: string | number;
  total_stars: string | number;
  total_forks: string | number;
  total_issues: string | number;
  total_closed_issues: string | number;
  total_contributions: string | number;
};

async function getData(username: string, lang: TLang = "en"): Promise<GetData> {
  let user = await basicFetch(username);

  let totalRepoPages = Math.ceil(user.repositories.totalCount / 100);
  let userRepositories = await repositoryFetch(username, totalRepoPages);

  if (!user.name) user.name = user.login;

  let output = {
    username: user.login,
    name: user.name,
    pic: await base64ImageFetcher.encode(`${user.avatarUrl}&s=200`, {
      string: true,
    }),
    public_repos: convertNumber(millify(user.repositories.totalCount), lang),
    followers: convertNumber(millify(user.followers.totalCount), lang),
    following: convertNumber(millify(user.following.totalCount), lang),
    total_stars: convertNumber(millify(userRepositories.stars), lang),
    total_forks: convertNumber(millify(userRepositories.forks), lang),
    total_issues: convertNumber(
      millify(user.openedIssues.totalCount + user.closedIssues.totalCount),
      lang,
    ),
    total_closed_issues: convertNumber(
      millify(user.closedIssues.totalCount),
      lang,
    ),
    total_contributions: convertNumber(
      millify(
        user.contributionsCollection.restrictedContributionsCount +
          user.contributionsCollection.totalCommitContributions,
      ),
      lang,
    ),
  };

  return output;
}

export default getData;
