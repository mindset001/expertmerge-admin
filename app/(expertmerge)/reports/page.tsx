
import SectionOne from "./sections/SectionOne"
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
