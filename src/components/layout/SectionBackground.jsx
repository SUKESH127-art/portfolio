import PropTypes from 'prop-types';

const SectionBackground = ({ 
  imageUrl, 
  children, 
  className = '', 
  id,
  backgroundPosition = 'center',
  minHeight = '100vh',
  ...rest 
}) => {
  return (
    <section 
      id={id}
      className={className}
      style={{ 
        position: 'relative',
        minHeight,
        ...rest.style 
      }}
      {...rest}
    >
      {/* Background Layer - breaks out of container to full viewport width */}
      <div 
        className="absolute -z-50"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: backgroundPosition,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '100%',
          minHeight: minHeight,
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

SectionBackground.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  backgroundPosition: PropTypes.string,
  minHeight: PropTypes.string,
};

export default SectionBackground;

