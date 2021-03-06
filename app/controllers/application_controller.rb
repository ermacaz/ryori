class ApplicationController < ActionController::Base
  prepend_before_action :login_required, :except=>[:home]
  before_action :allow_cors
  skip_before_action :verify_authenticity_token


  protected
  def login_required
    key = request.headers['Authorization']
    if key && User.find_by_api_key(key)
      return true
    else
      render_json_response(:status=>401, :success=>false, :message=>'Invalid API key') and return
    end
  end

  def allow_cors
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end

  def render_json_response(data:nil, status:200, success:true, message:'')
    render :status=>status, :json=> {data: data, success: success, message: message }
  end
end
