const GoogleMap = ({ address }) => {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className="container my-3">
      <div className="ratio ratio-4x3">
        {" "}
        {/* You can use 16x9 too */}
        <iframe
          title="Google Map"
          src={mapUrl}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
    // <div style={{ height: "400px", width: "100%" }}>
    //   <iframe
    //     title="Google Map"
    //     width="100%"
    //     height="100%"
    //     style={{ border: 0 }}
    //     loading="lazy"
    //     allowFullScreen
    //     src={mapUrl}
    //   />
    // </div>
  );
};

export default GoogleMap;
