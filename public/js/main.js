$(document).ready(function () {
    $('.delete-todo').click(function (e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        console.log('id: ' + id);
        $.ajax({
            type: "DELETE",
            url: "/todo/delete/" + id,
            success: response => {
                alert("Todo Deleted!");
                location.reload();
            },
            error: error => console.log(error)
        });
    });
});