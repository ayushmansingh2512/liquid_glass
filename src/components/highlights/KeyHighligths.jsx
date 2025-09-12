    import React from 'react'
    import star from '../../assets/Keyhighlights/star.svg'
    import sysdes from '../../assets/Keyhighlights/systemdegine.svg'
    import UX4G from '../../assets/Keyhighlights/UX4G.svg'
    import arrow from '../../assets/Keyhighlights/arrow.svg'
    import dylan from '../../assets/Keyhighlights/dylanFeild.svg'
    import pixel from '../../assets/Keyhighlights/indiaPixel.svg'

    import './keyHightlights.css'
    const KeyHighligths = () => {
    return (
        <div className='mainHighligt'>
            <div className='highlight-156'>
        <div className='heading'>
                <div className='keyHigh'> <img className='star' src={star} alt='star'/> <p className='p-key'>KEY HIGHLIGHTS</p></div>
                <p className='p-dis'>Discover what I have been up-to ✨</p>
        </div>
        {/* --- this is where all the images will come in all the images related to this are keyhighlights folder in assests ---  */}
        <div className='highlights'>
            <div className='high1'>
                    <div className='figmaProfile'>
                        <img className='sysdes' src={sysdes} alt='systemdegine' />
                    </div>
                    <div className='LFG'>
                        <h1 className='LetF'>Let's <span className='Fing'>F'ing</span> Gooooo</h1>
                    </div>
            </div> 
            <div className='high2'>
                <div className='UX4G'>
                    <img className='UX-img' src={UX4G} alt='UX4G' />
                </div>
                <div className='UXText'>
                    <img className='arrow' src={arrow} alt='arrow' />
                    <p className='yepThatH'>Figma’s CEO with a “LFG”  on something I created from scratch (yep, that happened)</p>
                </div>
            </div>
            
                <div className='high3'>
                    <div className='glass'>
                        <img className='dylanTweet'  src={dylan} alt='dylan feilfd tweet' />
                    </div>
                </div>

            <div className='high4'>
                    <p className='And'>And the <spaan className="design-com">design<br/>    community</spaan> showed crazy love ❤️</p>
                  
                        <img className='indiaInPixel'  src={pixel} alt='Inida in pixel tweet'/>
          
            </div>
        </div>

        </div>
        </div>
    )
    }

    export default KeyHighligths
