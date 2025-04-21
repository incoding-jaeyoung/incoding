'use client'
import dynamic from 'next/dynamic'

// 컴포넌트 임포트
const App = dynamic(() => import('./components/App'), { ssr: false })

export default function LensRefractionPage() {
  return (
    <>
      <link rel="stylesheet" href="/lab/LensRefraction/styles.css" />
      {/* <App /> */}
      <section className="container contents-wrapper">
        <div className="lens-con">
          <p className='text-center'>
            <strong>
              We use CSS to create a responsive layout.
            </strong>
             <br />
            <em>
                A Canvas on top tracks DOM elements and enhance them with WebGL.
            </em>
          </p>
        </div>
      </section>
    </>
  );
}