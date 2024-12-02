import Image from "next/image";
import Header from "@/components/header/page"
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center  ">
     <Header/>

      <main className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mt-8">
        {/* Introduction Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-bold">Appmontize Media</span>, we are
            driven by a passion to build tools that simplify daily life. Founded
            in Singapore, our company has established itself as a
            forward-thinking media enterprise committed to creating innovative
            solutions that cater to diverse needs. Our tools are designed to
            make life easier for individuals, businesses, and professionals
            worldwide.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is simple yet impactful:{" "}
            <span className="font-bold">
              to create tools that improve the quality of life through
              efficiency and innovation.
            </span>{" "}
            By focusing on everyday challenges, we aim to empower users with
            tools that streamline processes, save time, and enhance
            productivity.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Our solutions are built with a focus on accessibility, scalability,
            and user-friendliness, ensuring they cater to everyone – from
            individual users to large-scale enterprises.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Behind <span className="font-bold">Appmontize Media</span> is a
            team of visionary leaders and innovative minds. Together, we are
            dedicated to turning ideas into reality:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li className="text-gray-700">
              <span className="font-bold">Aditya Agarwal</span> – Co-Founder &
              Director
            </li>
            <li className="text-gray-700">
              <span className="font-bold">Nikhil Vatts</span> – Co-Founder &
              Director
            </li>
            <li className="text-gray-700">
              <span className="font-bold">Vibhu Jain</span> – Co-Founder &
              Director
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Our technical endeavors are spearheaded by{" "}
            <span className="font-bold">Abhishek</span>, our tech team lead,
            who brings a wealth of expertise and creativity to every tool we
            build. From ideation to execution, Abhishek ensures our tools meet
            the highest standards of quality and functionality.
          </p>
        </section>

        {/* Promise Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Promise
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At Appmontize Media, we are committed to:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li className="text-gray-700">
              <span className="font-bold">Innovation</span>: Constantly
              exploring new technologies to improve our tools.
            </li>
            <li className="text-gray-700">
              <span className="font-bold">Quality</span>: Ensuring every tool is
              meticulously crafted and optimized for exceptional performance.
            </li>
            <li className="text-gray-700">
              <span className="font-bold">User Satisfaction</span>: Listening to
              our users and enhancing our solutions based on their needs.
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            As we continue to grow, we remain focused on expanding our reach
            and pushing the boundaries of what’s possible in the tech space. We
            invite you to join us on this exciting journey as we continue to
            innovate and create tools that make life simpler for everyone.
          </p>
        </section>
      </main>
    </div>
  );
}
