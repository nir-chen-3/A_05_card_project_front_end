/*

Great question! When you have too many users to render all at once, pagination is the way to go. You can break the users into pages and display only a portion at a time. Here's how you can do it simply in React using client-side pagination:

🔹 Basic Steps for Pagination
Choose how many items per page (e.g., 10 users per page).

Track the current page with useState.

Slice the array of users to show only the users for that page.

Add pagination controls (buttons or page numbers) to navigate between pages.




*/

const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 10;

// Calculate start and end indexes
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = usersList.slice(indexOfFirstUser, indexOfLastUser);

// Number of pages
const totalPages = Math.ceil(usersList.length / usersPerPage);

// Handle page change
const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

<div className="pagination mt-3">
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
    <button
      key={page}
      className={`btn btn-sm me-2 ${
        page === currentPage ? "btn-primary" : "btn-outline-primary"
      }`}
      onClick={() => handlePageChange(page)}
    >
      {page}
    </button>
  ))}
</div>;

// Instead of usersList.map(...) in AdminSandBox, you do:

currentUsers.map((user) => <AdminUserItem key={user._id} user={user} />);
