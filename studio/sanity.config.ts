import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { media } from "sanity-plugin-media";
import { resolve } from "./presentation/resolve";
import { structure } from "./structure";
import { defaultDocumentNode } from "./defaultDocumentNode";
import { codeInput } from "@sanity/code-input";

// documents
import page from "./schemas/documents/page";
import post from "./schemas/documents/post";
import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import faq from "./schemas/documents/faq";
import testimonial from "./schemas/documents/testimonial";
import navigation from "./schemas/documents/navigation";
import settings from "./schemas/documents/settings";

// Schema UI shared objects
import blockContent from "./schemas/blocks/shared/block-content";
import link from "./schemas/blocks/shared/link";
import { colorVariant } from "./schemas/blocks/shared/color-variant";
import { buttonVariant } from "./schemas/blocks/shared/button-variant";
import sectionPadding from "./schemas/blocks/shared/section-padding";
// Schema UI objects
import hero1 from "./schemas/blocks/hero/hero-1";
import hero2 from "./schemas/blocks/hero/hero-2";
import sectionHeader from "./schemas/blocks/section-header";
import splitRow from "./schemas/blocks/split/split-row";
import splitContent from "./schemas/blocks/split/split-content";
import splitCardsList from "./schemas/blocks/split/split-cards-list";
import splitCard from "./schemas/blocks/split/split-card";
import splitImage from "./schemas/blocks/split/split-image";
import splitInfoList from "./schemas/blocks/split/split-info-list";
import splitInfo from "./schemas/blocks/split/split-info";
import gridCard from "./schemas/blocks/grid/grid-card";
import pricingCard from "./schemas/blocks/grid/pricing-card";
import gridPost from "./schemas/blocks/grid/grid-post";
import gridRow from "./schemas/blocks/grid/grid-row";
import carousel1 from "./schemas/blocks/carousel/carousel-1";
import carousel2 from "./schemas/blocks/carousel/carousel-2";
import timelineRow from "./schemas/blocks/timeline/timeline-row";
import timelinesOne from "./schemas/blocks/timeline/timelines-1";
import cta1 from "./schemas/blocks/cta/cta-1";
import logoCloud1 from "./schemas/blocks/logo-cloud/logo-cloud-1";
import faqs from "./schemas/blocks/faqs";
import newsletter from "./schemas/blocks/forms/newsletter";
import allPosts from "./schemas/blocks/all-posts";

// Define the actions that should be available for singleton documents
const singletonActions = new Set([
  "publish",
  "discardChanges",
  "restore",
  "unpublish",
]);

// Define the singleton document types
const singletonTypes = new Set(["settings", "navigation"]);

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || "2024-10-31";

const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

export default defineConfig({
  title: "Schema UI Mono",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    types: [
      // documents
      page,
      post,
      author,
      category,
      faq,
      testimonial,
      navigation,
      settings,
      // shared objects
      blockContent,
      link,
      colorVariant,
      buttonVariant,
      sectionPadding,
      // blocks
      hero1,
      hero2,
      sectionHeader,
      splitRow,
      splitContent,
      splitCardsList,
      splitCard,
      splitImage,
      splitInfoList,
      splitInfo,
      gridCard,
      pricingCard,
      gridPost,
      gridRow,
      carousel1,
      carousel2,
      timelineRow,
      timelinesOne,
      cta1,
      logoCloud1,
      faqs,
      newsletter,
      allPosts,
    ],
    // Filter out singleton types from the global "New document" menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve,
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    media(),
  ],
});
