import React from 'react'

import PropTypes from 'prop-types'
 
 const Rating = ({value , text , color}) => {
     return (
         <div className='rating'>
             <span>
                 <i style={{color}}
                    className={
                        value >= 1
                        ? 'fas fa-star'
                        : value >= 0.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }
                ></i>
             </span>
             <span> 
                 <i style={{color}}
                    className={
                        value >= 2
                        ? 'fas fa-star'
                        : value >= 1.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }
                ></i>
             </span>
             <span>
                 <i  style={{color}}
                    className={
                        value >= 3
                        ? 'fas fa-star'
                        : value >= 2.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }
                ></i>
             </span>
             <span>
                 <i   style={{color}}
                    className={
                        value >= 4
                        ? 'fas fa-star'
                        : value >= 3.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }
                ></i>
             </span>
             <span>
                 <i   style={{color}}
                    className={
                        value >= 5
                        ? 'fas fa-star'
                        : value >= 4.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }
                ></i>
             </span>
             <span>{text && text}</span>
             {/* if there is a text, show it, equal to text ? text : ' ', means that if there is not text, show empty */}

         </div>
     )
 }

 Rating.defaultProps = {
     color : '#ffdf00',
 }

 //props typechecking. for example if text prop sent as a number, we will revieve an error message in console.
 Rating.propTypes = {
     value: PropTypes.number.isRequired,
     text: PropTypes.string.isRequired,
     color: PropTypes.string 
 }

 
 export default Rating
 