require "test_helper"

class TodoControllerTest < ActionDispatch::IntegrationTest
  test "should get api/v1/" do
    get todo_api/v1/_url
    assert_response :success
  end
end
