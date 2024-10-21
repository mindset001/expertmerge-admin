import FeedLayout from "@/components/expert-layouts/FeedLayout"

import SectionTwo from "./sections/SectionTwo"
import SavedPostLayout from "./SavedPostLayout"

const page = () => {
  return (
    <SavedPostLayout
    // feed1={<SectionOne />}
    feed2={<SectionTwo />}
    />
  )
}

export default page
