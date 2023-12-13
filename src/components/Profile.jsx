function Profile({ title = undefined, profile }) {
  return (
    <div className="profile">
      {title !== undefined && <h3 className="title">{title}</h3>}
      <img src={profile.picture} alt={profile.name} />
      <h2 className="name">{profile.name}</h2>
    </div>
  );
}

export default Profile;
