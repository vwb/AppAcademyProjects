module ApplicationHelper
  def csrf_token
    html = <<-HTML
      <input type="hidden" name="authenticity_token" value = "#{form_authenticity_token}">
    HTML
    html.html_safe
  end

  def form_method_type(type)
    html = <<-HTML
      <input type="hidden" name="_method" value = "#{type}">
    HTML
    html.html_safe
  end
end
