require "test_helper"

class Api::V1ControllerTest < ActionDispatch::IntegrationTest
  test "should get ToDo" do
    get api_v1_ToDo_url
    assert_response :success
  end
end
