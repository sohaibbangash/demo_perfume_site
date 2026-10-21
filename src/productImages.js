import touchOfGold from "./pic/gold.jpg?url";
import touchOfGoldDetail from "./pic/Touch_of_Gold_5.png?url";
import firstLight from "./pic/first_light.jpg?url";
import firstLightDetail from "./pic/first_light_7.jpg?url";
import blush from "./pic/Blush_6.png?url";
import blushDetail from "./pic/Blush_8.png?url";
import trueEssence from "./pic/True_Essence_1_f3d814a8-29e7-4077-a324-fe840bad3627.png?url";
import trueEssenceDetail from "./pic/True_Essence_2_5179b319-7d07-43b1-86a2-02b9bb89b2ac.png?url";
import innerGlow from "./pic/Inner_Glow_1_48c8e7c2-8242-4f4a-a180-c378244881b5.png?url";
import innerGlowDetail from "./pic/Inner_Glow_3_d835e1c1-fc95-4d3a-b942-4d9ab770e1c0.png?url";
import milestone from "./pic/milestone.jpg?url";
import milestoneDetail from "./pic/milestone_1_f8074e03-559b-417a-b857-d1d773687fed.jpg?url";
import forbiddenCherry from "./pic/Forbidden_Cherry_2.jpg?url";
import forbiddenCherryDetail from "./pic/Forbidden_Cherry_2_-_Copy.jpg?url";
import pink from "./pic/Pink.jpg?url";
import pinkDetail from "./pic/Pink_8a690087-f092-4712-ac1f-e715cd807f08.jpg?url";
import triumph from "./pic/Triumph_2_bca32836-078b-43cb-9566-848fc1c9fe38.png?url";
import triumphDetail from "./pic/Triumph_5.png?url";
import maverick from "./pic/maverick.jpg?url";
import maverickDetail from "./pic/maverick_5.jpg?url";
import vision from "./pic/Vision_1_0d03c81e-560e-4ca2-8d8e-d14d9071d9cf.png?url";
import visionDetail from "./pic/Vision_2_5bf86e10-6522-4e86-9ce9-975090173034.png?url";
import aspire from "./pic/Aspire_2_a06c9ca2-71b4-4803-824d-9ae929021788.png?url";
import aspireDetail from "./pic/Aspire_4.png?url";
import rage from "./pic/Rage_4.jpg?url";
import rageDetail from "./pic/Rage_5.jpg?url";
import explorer from "./pic/exploror_2_-2.jpg?url";
import explorerDetail from "./pic/exploror_3.jpg?url";
import elixir from "./pic/1080x1620_0000_elixir_100.jpg?url";
import elixirDetail from "./pic/1080x1620_0001_elixir_50.jpg?url";
import oudWood from "./pic/oud_wood_4.jpg?url";
import oudWoodDetail from "./pic/oud_wood_6.jpg?url";
import black from "./pic/black.jpg?url";
import blackDetail from "./pic/black_2.jpg?url";
import yellow from "./pic/Yellow.jpg?url";
import yellowDetail from "./pic/yellow_1.jpg?url";

export const productImages = {
  "touch-of-gold": { image: touchOfGold, hoverImage: touchOfGoldDetail },
  "first-light": { image: firstLight, hoverImage: firstLightDetail },
  blush: { image: blush, hoverImage: blushDetail },
  "true-essence": { image: trueEssence, hoverImage: trueEssenceDetail },
  "inner-glow": { image: innerGlow, hoverImage: innerGlowDetail },
  milestone: { image: milestone, hoverImage: milestoneDetail },
  "forbidden-cherry": { image: forbiddenCherry, hoverImage: forbiddenCherryDetail },
  pink: { image: pink, hoverImage: pinkDetail },
  triumph: { image: triumph, hoverImage: triumphDetail },
  maverick: { image: maverick, hoverImage: maverickDetail },
  vision: { image: vision, hoverImage: visionDetail },
  aspire: { image: aspire, hoverImage: aspireDetail },
  rage: { image: rage, hoverImage: rageDetail },
  explorer: { image: explorer, hoverImage: explorerDetail },
  elixir: { image: elixir, hoverImage: elixirDetail },
  "oud-wood": { image: oudWood, hoverImage: oudWoodDetail },
  black: { image: black, hoverImage: blackDetail },
  yellow: { image: yellow, hoverImage: yellowDetail },
};

export const heroSlides = [
  {
    eyebrow: "THE SIGNATURE COLLECTION",
    title: "A touch of",
    highlight: "gold.",
    description: "Make every entrance unforgettable with a fragrance that leaves a little shimmer behind.",
    productId: "touch-of-gold",
    image: touchOfGold,
    label: "TOUCH OF GOLD",
  },
  {
    eyebrow: "FOR THE FEARLESS",
    title: "Leave ordinary",
    highlight: "behind.",
    description: "Bold bottles. Distinctive scents. Find your next signature in our collection.",
    productId: "maverick",
    image: maverick,
    label: "MAVERICK",
  },
  {
    eyebrow: "A NEW POINT OF VIEW",
    title: "Wear the",
    highlight: "unexpected.",
    description: "From first impression to lasting memory, discover scents made to move with you.",
    productId: "triumph",
    image: triumph,
    label: "TRIUMPH",
  },
];

export const categoryImages = {
  Women: pink,
  Men: aspire,
};

export const collectionImage = touchOfGold;

export function getProductImages(id) {
  return productImages[id] ?? productImages["touch-of-gold"];
}
