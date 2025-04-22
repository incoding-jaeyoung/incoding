'use client'
import dynamic from 'next/dynamic'

// 컴포넌트 임포트
const App = dynamic(() => import('./components/App'), { ssr: false })

export default function LensRefractionPage() {
  return (
    <>
      <link rel="stylesheet" href="/lab/LensRefraction/styles.css" />
      <App />
      <section className="container contents-wrapper bottom-lens">
        <div className="lens-con">
          <p className="text-center max-w-[800px] mx-auto bottom-text">
            <strong>Lens Refraction</strong> <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus praesentium sint, dolor a quisquam dolorem nemo hic culpa enim excepturi mollitia error facere commodi est? Laborum voluptatum minima quasi nemo!
        </p>
        </div>
      </section>
    </>
  );
}