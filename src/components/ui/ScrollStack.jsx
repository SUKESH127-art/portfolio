import PropTypes from 'prop-types';
import './ScrollStack.css';

/**
 * ScrollStackItem Component
 * Individual card wrapper that creates a stackable item.
 * Each item will be positioned and transformed based on scroll position
 * to create the stacked card effect. The CSS handles the 3D transforms
 * and z-index layering to achieve the visual stacking.
 */
export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

ScrollStackItem.propTypes = {
  children: PropTypes.node.isRequired,
  itemClassName: PropTypes.string
};

/**
 * ScrollStack Component
 * Container that creates a scroll-based stacking effect for child items.
 * 
 * How the stacking works:
 * - Uses CSS transforms and scroll-based positioning to stack cards
 * - Cards are positioned with increasing z-index and slight offsets
 * - As user scrolls, cards animate in/out of view with 3D transforms
 * - The CSS in ScrollStack.css handles the scroll-triggered animations
 */
const ScrollStack = ({ children, className = '' }) => (
  <div className={`scroll-stack-scroller ${className}`.trim()}>
    <div className="scroll-stack-inner">
      {children}
    </div>
  </div>
);

ScrollStack.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default ScrollStack;
 
