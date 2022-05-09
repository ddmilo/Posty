require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get api/v1/" do
    get users_api/v1/_url
    assert_response :success
  end
end
