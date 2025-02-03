import Head from "next/head";

export default function AboutPage() {
  return (
    <div>
      <Head>
        <title>About Us - NerdBunny</title>
        <meta
          name="description"
          content="Learn about NerdBunny, an AI-powered DeSci project dedicated to improving the accuracy and transparency of scientific research."
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">About NerdBunny</h1>

        <section className="mb-8">
          <p className="text-lg mb-4">
            <b>NerdBunny</b> is an <b>AI-powered DeSci</b> (Decentralized
            Science) project that <b>detects errors in research papers</b>,
            ensuring higher accuracy and transparency in scientific publishing.
            It’s designed to <b>make complex studies easier to understand</b>
            while adding a layer of community-driven validation through
            discussion, comments, and engagement.
            <br />
            <b>
              NerdBunny doesn’t just spot mistakes—it helps prevent
              misinformation from spreading in science.
            </b>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Why Is This Important?</h2>
          <p className="text-lg mb-4">
            One error in a research paper can have huge consequences, leading to
            wasted resources, public misinformation, and even harm to human
            lives. Here are some major examples where small mistakes in research
            led to big problems:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li className="mb-2">
              <strong>The 1998 study falsely linking vaccines to autism</strong>{" "}
              – This single, now-debunked study by Andrew Wakefield led to
              widespread vaccine hesitancy, fueling misinformation that still
              affects public health today.
            </li>
            <li className="mb-2">
              <strong>The 2010 "Arsenic Life" study</strong> – NASA-funded
              scientists claimed a new form of life could survive on arsenic
              instead of phosphorus. Later, errors in methodology showed the
              claim was incorrect, but not before it influenced funding and
              scientific discourse.
            </li>
            <li className="mb-2">
              <strong>Cold fusion (1989)</strong> – Scientists announced they
              had achieved fusion energy at room temperature. The study had
              poorly controlled experiments, and no one could replicate the
              results, but the media hype led to wasted resources and loss of
              credibility in the field.
            </li>
            <li className="mb-2">
              <strong>The Stanford Prison Experiment (1971)</strong> –
              Considered one of psychology’s most famous studies, later analysis
              found that data was manipulated and results were exaggerated,
              affecting decades of discussions on human behavior.
            </li>
            <li className="mb-2">
              <strong>The 1993 "Superconducting Super Collider" failure</strong>{" "}
              – Over $2 billion was wasted on a canceled particle physics
              project, partially because of incorrect calculations and
              underestimated costs in early research.
            </li>
            <li className="mb-2">
              <strong>Mistakes in climate science projections</strong> – In the
              early 20th century, errors in climate models underestimated global
              warming trends, delaying action on climate change. Even today,
              scientific errors in reporting lead to confusion and public
              skepticism.
            </li>
            <li className="mb-2">
              <strong>Medical studies with bad data</strong> – Some early
              studies on opioids claimed they were "non-addictive" when
              prescribed for pain, contributing to the opioid crisis that has
              devastated communities worldwide.
            </li>
            <li className="mb-2">
              <strong>The Piltdown Man fraud (1912)</strong> – A fake fossil
              discovery, accepted as real for 40 years, misled scientists and
              wasted decades of anthropological research.
            </li>
          </ul>
          <p className="text-lg">
            These examples show why accuracy in science matters. A single
            overlooked error can mislead future research, waste funding, and
            misinform the public.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            How NerdBunny Helps Fix This
          </h2>
          <p className="text-lg mb-4">
            NerdBunny allows researchers to upload their studies, where our AI
            agent scans for inconsistencies, calculation errors, missing
            citations, and formatting issues. The community can then engage by
            adding notes, comments, and insights to further improve the work.
          </p>
          <p className="text-lg">
            Our goal is to create a smarter, more transparent, and error-free
            scientific ecosystem where mistakes are caught before they cause
            damage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            More Than Just an AI Tool—A Movement for Open Science
          </h2>
          <p className="text-lg mb-4">
            NerdBunny is fully integrated into NobleBlocks, making it part of a
            broader social network for scientists and researchers. By combining
            serious research tools with meme culture, we make science more
            accessible, engaging, and community-driven.
          </p>
          <p className="text-lg">
            This is more than just error detection—it’s a revolution in how
            science is validated. Science should be open, transparent, and
            fun—NerdBunny is here to make sure it stays that way. 🧬🐇
          </p>
        </section>
      </main>
    </div>
  );
}
