const CustomScrollbar = ({
    children,
    className = '',
    scrollbarWidth = '10px',
    thumbColor = 'rgba(255, 255, 255, 0.2)',
    thumbHoverColor = 'rgba(255, 255, 255, 0.7)',
    style = {} // اضافه شده
}) => {
    return (
        <div
            className={`custom-scrollbar overflow-y-auto ${className}`}
            style={style} // اضافه شده
        >
            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: ${scrollbarWidth};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-clip: padding-box;
          background-color: ${thumbColor};
          border: 2px solid transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: ${thumbHoverColor};
        }
      `}</style>
            {children}
        </div>
    );
};

export default CustomScrollbar;
