import FeedLayout from "@/components/expert-layouts/FeedLayout"
import SectionOne from "./sections/SectionOne"
import SectionThree from "./sections/SectionThree"
import SectionTwo from "./sections/SectionTwo"
import SavedPostLayout from "./SavedPostLayout"

const page = () => {
  return (
    <SavedPostLayout
    feed1={<SectionOne />}
    feed2={<SectionTwo />}
    />
  )
}

export default page
