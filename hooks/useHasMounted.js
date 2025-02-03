// for hydration

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return has Mounted;
}


// usage

function Navigation() {
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  const user = getUser();
  if (user) {
    return (
      <AuthenticatedNav
        user={user}
      />
    );
  }
  return (
    <nav>
      <a href="/login">Login</a>
    </nav>
  );
};
