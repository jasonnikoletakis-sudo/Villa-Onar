// Utility to convert Google Drive sharing link to a direct thumbnail link
// This avoids the 'virus scan' interstitial page for large images and allows hotlinking
// Supported sizes (sz parameter): w200, w400, w600, w800, w1200, w1600, w1920
export const getImageUrl = (id: string, size: string = 'w800'): string => {
  return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;
};

export const ALL_IMAGE_IDS = [
  "1-Jy0EvK7kgcpyHNGFdlnrItUhXyfnBn2",
  "1-Zxb2fnCQmXTSMwSvx6w_UI5sZ-MSMRT",
  "11bf3LzhmM4THmWhaalbjUmfHZILBuMWE",
  "12Dms1UKWMCJCaiBW39e_CluCyUZTsiwu",
  "13GuixSfGHpohaVMjzcht16U4BZRTndBn",
  "14C_6m3SSnZ-ZJDWkk5bjGXeOY4kvOTfP",
  "17eDeJ0wLtr-Oy4T1twHJB_LOSHS7ynU7",
  "1A3nQ_xH6RcnBQW_JNVjZBv7FrM65XRbf",
  "1BcgdnUlxAZR76xFTY6zw5dmjOKEn3q75",
  "1BwBzM-TPkmGwPq5L71UB-DgoN4q-NCj9",
  "1DZWISOyOLIPOrMElPWVo9QO_OwvAN3uX",
  "1FWrFSW6JWAF3N7ntJyXO5xwxo2cSCR7p",
  "1Jf8EIl5GLZTIeG8FUMnw2CtmPijTMH6B",
  "1K1pkLIm4N1xpGGYaUtPb-gVYJKHzdW6N",
  "1MRq0WhylaH0qkAIs8z3_yRDdFKJRI9Uw",
  "1MljHbTyAIeZgXOPyE8z3NRpGl2AJqKoj",
  "1NYO0U-Mwq1cX3z_3yTDjf8rIfloA1av1",
  "1Q9MrRb9H1tG-VX7H2jn75gOXI97e9e41",
  "1QlhV0A58n6UcXVtQugc30fwoaBLKX42M",
  "1RG2CAEhEjhDBEuV0J_5wW67e1v0A46Wh",
  "1W-NHl_kcqdpZoO-aZVV_ggAUjPKqpcdO",
  "1ZAmDsupqs8btiu99lWopXz85hlAItbEU",
  "1_h4ebysa0OFrDJRgdGMTr4HBg25-k15K",
  "1aOFIoK7uxLwhDcsgI6VxwY5CidvACLWy",
  "1ctH_mNfM2e-vmDQIPY9dgYSLaSc8d0Se",
  "1diGwgEfyvJLDX0xmhomwQwQF0BAUAJYH",
  "1ifWQQF_vxAWV5R4SzA8BOPgF5h9Cl_bq",
  "1iiJEmb-z0APtntg5fylEJzQFTYkw3c64",
  "1jsNWxieIXRFrlAprwJfZdwe--P7k0GYc",
  "1kob1L2A8u_eg-YTr5R1_jKf6irfzn2Nr",
  "1kwNAHLHrS8l4a8tR3Id0IRZ4NvOhAvbA",
  "1l6lg41ZdtvJOZ2FojmHowzCN2Tkmnrag",
  "1lCAmuRgL8IQ7CAJdrQBOIvsJcyopBpxo",
  "1n_-AQdcoupGVG9cB4o3ozVl77bb4Ie6g",
  "1nmV4Z3gO7BQMDQ20-qAgWNuM2PSavvDi",
  "1pRl1LWT_D6qWTsXS6rKqiVsvP50cTl9O",
  "1qKYHP9F2OYU-4DuMJqgFOOKO6bx0U4QB",
  "1rz0WfYewUuCjyprGay3ZZ8htnJXLJFOA",
  "1uJ8TXQ2GI4Ow0FYjBPQIPSg1Gj36VcyU",
  "1uoYOwBqHg-DIBN-OT9VeRLUs-KzqJ0AZ",
  "1vVkKvBsVoEvp2qLSIshMBBrDPiMPXnuT"
];

// Specific images selected for layout prominence
export const HERO_IMAGE_ID = "1uoYOwBqHg-DIBN-OT9VeRLUs-KzqJ0AZ";
export const BENTO_IMAGES = [
  "1MljHbTyAIeZgXOPyE8z3NRpGl2AJqKoj",
  "11bf3LzhmM4THmWhaalbjUmfHZILBuMWE",
  "12Dms1UKWMCJCaiBW39e_CluCyUZTsiwu",
  "13GuixSfGHpohaVMjzcht16U4BZRTndBn",
  "14C_6m3SSnZ-ZJDWkk5bjGXeOY4kvOTfP"
];